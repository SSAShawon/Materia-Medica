import type { Medicine } from "@/types/medicine";

import arsenicumAlbum from "@/data/medicines/arsenicum-album.json";
import cinchonaOfficinalis from "@/data/medicines/cinchona-officinalis.json";
import cuprumMetallicum from "@/data/medicines/cuprum-metallicum.json";
import cephalandraIndica from "@/data/medicines/cephalandra-indica.json";
import chamomilla from "@/data/medicines/chamomilla.json";
import crocusSativus from "@/data/medicines/crocus-sativus.json";
import corallinum from "@/data/medicines/corallinum.json";

/**
 * Canonical local edition of the library, ordered by stable medicine ID.
 *
 * This file is the offline/dev fallback and the seed source for Supabase. It is
 * imported only by server-side modules, so the raw JSON is not shipped to the
 * browser. Once Supabase is configured it is no longer used to answer reads.
 */
export const localMedicines: Medicine[] = [
  arsenicumAlbum,
  cinchonaOfficinalis,
  cuprumMetallicum,
  cephalandraIndica,
  chamomilla,
  crocusSativus,
  corallinum,
];

export function getLocalMedicineBySlug(slug: string): Medicine | undefined {
  return localMedicines.find((medicine) => medicine.slug === slug);
}
