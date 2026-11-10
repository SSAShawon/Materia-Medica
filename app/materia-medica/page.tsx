import Link from "next/link";

import { getAllMedicines, getMedicineDataSource } from "@/lib/medicines";

export const revalidate = 300;

export default async function MateriaMedicaPage() {
  const medicines = await getAllMedicines();
  const source = getMedicineDataSource();

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-500">
            Materia Medica
          </p>

          <h1 className="mt-3 text-5xl font-bold text-forest-950">
            Medicine Library
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-text-secondary">
            Explore structured Homeopathic Materia Medica information
            organized for study, revision and examination reference.
          </p>
        </section>

        {/* Medicine Count */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-y border-border py-5">
          <div>
            <p className="text-sm text-text-secondary">
              Medicines available
            </p>

            <p className="mt-1 text-3xl font-semibold text-forest-950">
              {medicines.length}
            </p>
          </div>

          {source === "local" && (
            <p className="max-w-xs text-xs leading-5 text-text-secondary">
              Showing the bundled study library. Connect Supabase to serve
              the published library from the database.
            </p>
          )}
        </div>

        {/* Medicine List */}
        {medicines.length > 0 ? (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {medicines.map((medicine) => (
              <article
                key={medicine.id}
                className="group border border-border bg-white p-7 transition hover:-translate-y-1 hover:border-forest-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gold-500">
                      {medicine.abbreviation}
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-forest-950">
                      {medicine.name}
                    </h2>

                    <p className="mt-1 text-sm italic text-text-secondary">
                      {medicine.scientificName}
                    </p>
                  </div>

                  <span className="text-sm text-text-secondary">
                    {medicine.id}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-text-secondary">
                  {medicine.drugPicture?.generalPicture}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {medicine.sphereOfAction?.slice(0, 3).map((sphere) => (
                    <span
                      key={sphere}
                      className="bg-sage-100 px-3 py-1 text-xs text-forest-900"
                    >
                      {sphere}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/materia-medica/${medicine.slug}`}
                  className="mt-7 inline-flex text-sm font-semibold text-forest-800 transition group-hover:text-gold-500"
                >
                  View Medicine →
                </Link>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-10 border border-border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-forest-950">
              No published medicines available
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-text-secondary">
              The library is empty. If Supabase has just been configured,
              apply the migrations and run the medicine seed script.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
