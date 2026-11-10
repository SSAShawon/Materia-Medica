#!/usr/bin/env node
/**
 * Generates supabase/seed/medicines.sql from data/medicines/*.json.
 *
 * The SQL is an idempotent upsert keyed on the stable medicine ID, so it can be
 * run repeatedly without creating duplicates. Review the generated file before
 * applying it, or apply it with: npm run db:seed
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data", "medicines");
const outputPath = join(root, "supabase", "seed", "medicines.sql");

const EXPECTED_IDS = [
  "MED-001",
  "MED-002",
  "MED-003",
  "MED-004",
  "MED-005",
  "MED-006",
  "MED-007",
];

function categoryFor(medicine) {
  const kingdom = String(medicine.kingdom ?? "").toLowerCase();
  if (kingdom.startsWith("plant")) return "Plant";
  if (kingdom.startsWith("mineral")) return "Mineral";
  if (kingdom.startsWith("animal")) return "Animal";
  return medicine.source ?? null;
}

function sqlString(value) {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function rowFor(medicine) {
  const json = JSON.stringify(medicine);
  if (json.includes("$materia_medica_json$")) {
    throw new Error(
      `Refusing to generate seed: ${medicine.id} contains the dollar-quote marker.`,
    );
  }

  return `(
  ${sqlString(medicine.id)},
  ${sqlString(medicine.slug)},
  ${sqlString(medicine.name)},
  ${sqlString(medicine.commonName ?? null)},
  ${sqlString(medicine.scientificName ?? null)},
  ${sqlString(medicine.abbreviation ?? null)},
  ${sqlString(categoryFor(medicine))},
  $materia_medica_json$${json}$materia_medica_json$::jsonb,
  true
)`;
}

function main() {
  const files = readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const medicines = files.map((file) => {
    const raw = readFileSync(join(dataDir, file), "utf8");
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`Invalid JSON in ${file}: ${error.message}`);
    }

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
      `Expected ${EXPECTED_IDS.length} medicines, found ${medicines.length}.`,
    );
  }

  for (const id of EXPECTED_IDS) {
    if (!ids.has(id)) {
      throw new Error(`Missing expected medicine id ${id}.`);
    }
  }

  if (ids.size !== medicines.length || slugs.size !== medicines.length) {
    throw new Error("Medicine ids and slugs must be unique.");
  }

  medicines.sort((a, b) => a.id.localeCompare(b.id));

  const sql = `-- GENERATED FILE — do not edit by hand.
-- Source: data/medicines/*.json
-- Regenerate with: npm run db:generate
--
-- Safe to run repeatedly: upserts on the stable medicine id and does not
-- delete medicines that are absent from the local library.

insert into public.medicines (
  id,
  slug,
  name,
  common_name,
  scientific_name,
  abbreviation,
  category,
  content,
  is_published
)
values
${medicines.map(rowFor).join(",\n")}
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  common_name = excluded.common_name,
  scientific_name = excluded.scientific_name,
  abbreviation = excluded.abbreviation,
  category = excluded.category,
  content = excluded.content,
  is_published = excluded.is_published,
  updated_at = now();

-- Verification: every seeded medicine must be present and published.
do $$
declare
  seeded_count integer;
begin
  select count(*) into seeded_count
  from public.medicines
  where id in (${EXPECTED_IDS.map(sqlString).join(", ")})
    and is_published = true;

  if seeded_count <> ${EXPECTED_IDS.length} then
    raise exception 'Expected ${EXPECTED_IDS.length} published medicines after seed, found %', seeded_count;
  end if;
end
$$;
`;

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, sql, "utf8");

  console.log(
    `Generated ${outputPath} with ${medicines.length} medicines: ${medicines
      .map((medicine) => `${medicine.id} ${medicine.slug}`)
      .join(", ")}`,
  );
}

main();
