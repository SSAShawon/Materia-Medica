#!/usr/bin/env node
/**
 * Seeds all seven medicines into Supabase with an idempotent upsert, then reads
 * them back through the public API to verify the result.
 *
 * Required environment variables (put them in .env.local, never commit them):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SECRET_KEY   (new sb_secret_... key) or SUPABASE_SERVICE_ROLE_KEY
 *
 * This script is the only place a secret key is used. It is never bundled into
 * the Next.js app.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data", "medicines");

const EXPECTED_IDS = [
  "MED-001",
  "MED-002",
  "MED-003",
  "MED-004",
  "MED-005",
  "MED-006",
  "MED-007",
];

function loadEnvFile(file) {
  if (!existsSync(file)) return;

  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue
      .replace(/^["']|["']$/g, "")
      .replace(/\s+#.*$/, "");
  }
}

function categoryFor(medicine) {
  const kingdom = String(medicine.kingdom ?? "").toLowerCase();
  if (kingdom.startsWith("plant")) return "Plant";
  if (kingdom.startsWith("mineral")) return "Mineral";
  if (kingdom.startsWith("animal")) return "Animal";
  return medicine.source ?? null;
}

function loadMedicines() {
  const files = readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const medicines = files.map((file) => {
    const parsed = JSON.parse(readFileSync(join(dataDir, file), "utf8"));

    for (const field of ["id", "slug", "name"]) {
      if (!parsed[field]) {
        throw new Error(`${file} is missing required field "${field}".`);
      }
    }

    return parsed;
  });

  const ids = new Set(medicines.map((medicine) => medicine.id));
  const slugs = new Set(medicines.map((medicine) => medicine.slug));

  if (medicines.length !== EXPECTED_IDS.length) {
    throw new Error(
      `Expected ${EXPECTED_IDS.length} medicine JSON files, found ${medicines.length}.`,
    );
  }

  if (ids.size !== medicines.length || slugs.size !== medicines.length) {
    throw new Error("Medicine ids and slugs must be unique.");
  }

  for (const id of EXPECTED_IDS) {
    if (!ids.has(id)) throw new Error(`Missing expected medicine id ${id}.`);
  }

  return medicines.sort((a, b) => a.id.localeCompare(b.id));
}

async function main() {
  loadEnvFile(join(root, ".env.local"));
  loadEnvFile(join(root, ".env"));

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    console.error(`
Cannot seed Supabase: missing credentials.

Add these to .env.local (gitignored):
  NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
  SUPABASE_SECRET_KEY=sb_secret_...        # server-only, never NEXT_PUBLIC

Alternatively set SUPABASE_SERVICE_ROLE_KEY for legacy projects.
Do not commit either key.
`);
    process.exitCode = 1;
    return;
  }

  const medicines = loadMedicines();

  const rows = medicines.map((medicine) => ({
    id: medicine.id,
    slug: medicine.slug,
    name: medicine.name,
    common_name: medicine.commonName ?? null,
    scientific_name: medicine.scientificName ?? null,
    abbreviation: medicine.abbreviation ?? null,
    category: categoryFor(medicine),
    content: medicine,
    is_published: true,
  }));

  const service = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: upsertError } = await service
    .from("medicines")
    .upsert(rows, { onConflict: "id" });

  if (upsertError) {
    console.error(`Seed failed: ${upsertError.message}`);
    console.error(
      "Check that both migrations have been applied and that the key is a secret/service-role key.",
    );
    process.exitCode = 1;
    return;
  }

  // Read back through the public API (anon permissions + RLS) rather than the
  // service role, so this also verifies that the public select policy works.
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!publicKey) {
    console.warn(
      "Seed upsert succeeded, but NEXT_PUBLIC_SUPABASE_ANON_KEY is not set, so the public read-back check was skipped.",
    );
    return;
  }

  const publicClient = createClient(url, publicKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await publicClient
    .from("medicines")
    .select("id, slug, name, is_published")
    .order("id", { ascending: true });

  if (error) {
    console.error(`Public verification read failed: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log("Medicines returned by the public API:");
  console.table(data);

  const returnedIds = new Set(data.map((row) => row.id));
  const missing = EXPECTED_IDS.filter((id) => !returnedIds.has(id));
  const unpublished = data.filter((row) => !row.is_published);

  if (missing.length || unpublished.length || data.length !== 7) {
    console.error(
      `Verification failed. Missing: ${missing.join(", ") || "none"}. ` +
        `Unpublished: ${unpublished.map((row) => row.id).join(", ") || "none"}. ` +
        `Total: ${data.length}.`,
    );
    process.exitCode = 1;
    return;
  }

  console.log("Verified: all 7 medicines are present and publicly readable.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
