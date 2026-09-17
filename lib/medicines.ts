import type { Medicine } from "@/types/medicine";
import arsenicumAlbum from "@/data/medicines/arsenicum-album.json";

export const medicines: Medicine[] = [arsenicumAlbum];

export function getMedicineBySlug(slug: string) {
  return medicines.find((medicine) => medicine.slug === slug);
}

export function getAllMedicines() {
  return medicines;
}