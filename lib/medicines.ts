import { cache } from "react";

import type { Medicine } from "@/types/medicine";

import {
  getLocalMedicineBySlug,
  localMedicines,
} from "./medicines-local";
import { isSupabaseConfigured } from "./supabase/config";
import { createPublicClient } from "./supabase/public";

export type MedicineDataSource = "supabase" | "local";

interface MedicineRow {
  id: string;
  slug: string;
  name: string;
  common_name: string | null;
  scientific_name: string | null;
  abbreviation: string | null;
  category: string | null;
  content: Partial<Medicine> | null;
}

const MEDICINE_COLUMNS =
  "id, slug, name, common_name, scientific_name, abbreviation, category, content";

function rowToMedicine(row: MedicineRow): Medicine {
  const content = row.content ?? {};

  return {
    ...content,
    id: row.id,
    slug: row.slug,
    name: row.name,
    commonName: row.common_name ?? content.commonName,
    scientificName: row.scientific_name ?? content.scientificName,
    abbreviation: row.abbreviation ?? content.abbreviation,
  };
}

/**
 * Current source of the public medicine library.
 * Local JSON is used only when Supabase is not configured.
 */
export function getMedicineDataSource(): MedicineDataSource {
  return isSupabaseConfigured() ? "supabase" : "local";
}

/**
 * Published medicines for the library and home page.
 *
 * When Supabase is configured the database is authoritative: an empty or
 * failed query returns no medicines rather than quietly serving local content
 * that may no longer be published. Without Supabase credentials the app runs
 * from the bundled JSON library so local development still works.
 */
export const getAllMedicines = cache(async (): Promise<Medicine[]> => {
  if (!isSupabaseConfigured()) {
    return localMedicines;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("medicines")
      .select(MEDICINE_COLUMNS)
      .eq("is_published", true)
      .order("id", { ascending: true });

    if (error) {
      console.error(
        `[medicines] Supabase library query failed: ${error.message}`,
      );
      return [];
    }

    return ((data ?? []) as MedicineRow[]).map(rowToMedicine);
  } catch (error) {
    console.error("[medicines] Supabase library query failed.", error);
    return [];
  }
});

export const getMedicineBySlug = cache(
  async (slug: string): Promise<Medicine | undefined> => {
    if (!isSupabaseConfigured()) {
      return getLocalMedicineBySlug(slug);
    }

    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("medicines")
        .select(MEDICINE_COLUMNS)
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) {
        console.error(
          `[medicines] Supabase medicine query failed for "${slug}": ${error.message}`,
        );
        return undefined;
      }

      return data ? rowToMedicine(data as MedicineRow) : undefined;
    } catch (error) {
      console.error(
        `[medicines] Supabase medicine query failed for "${slug}".`,
        error,
      );
      return undefined;
    }
  },
);

export const getFeaturedMedicine = cache(async (): Promise<Medicine | undefined> => {
  const medicines = await getAllMedicines();
  return medicines[0];
});

/**
 * Slugs available for static params/preview. Database-only medicines are still
 * resolved on demand by the dynamic route.
 */
export function getLocalMedicineSlugs(): string[] {
  return localMedicines.map((medicine) => medicine.slug);
}
