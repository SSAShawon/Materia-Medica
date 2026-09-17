import Link from "next/link";
import { getAllMedicines } from "@/lib/medicines";

export default function FeaturedMedicines() {
  const medicines = getAllMedicines();

  return (
    <section className="bg-ivory-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Explore the Library
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Start with a remedy.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-text-secondary">
              Explore structured remedy profiles covering keynotes,
              mental symptoms, modalities, systems, relationships and
              examination-focused revision.
            </p>
          </div>
        </div>

        {/* Medicine Content */}
        <div className="mt-10">
          {medicines.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

              {/* Featured Medicine */}
              <article className="group relative overflow-hidden border border-forest-950 bg-forest-950 p-8 sm:p-10">

                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-gold-400/20" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gold-400">
                        Featured Remedy
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        {medicines[0].id}
                      </p>
                    </div>

                    <span className="text-sm italic text-white/50">
                      {medicines[0].abbreviation}
                    </span>
                  </div>

                  <div className="mt-16">
                    <p className="text-sm italic text-gold-400">
                      {medicines[0].scientificName}
                    </p>

                    <h3 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      {medicines[0].name}
                    </h3>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                      {medicines[0].drugPicture?.generalPicture}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {medicines[0].sphereOfAction
                      ?.slice(0, 4)
                      .map((sphere) => (
                        <span
                          key={sphere}
                          className="border border-white/10 px-3 py-1.5 text-xs text-white/60"
                        >
                          {sphere}
                        </span>
                      ))}
                  </div>

                  <div className="mt-10 border-t border-white/10 pt-6">
                    <Link
                      href={`/materia-medica/${medicines[0].slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-gold-400 transition-transform group-hover:translate-x-1"
                    >
                      Explore full remedy
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>

              {/* Library Info */}
              <div className="flex flex-col border border-border bg-white p-8 sm:p-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-500">
                    Library
                  </p>

                  <p className="mt-5 text-6xl font-semibold tracking-tight text-forest-950">
                    {medicines.length}
                  </p>

                  <p className="mt-2 text-sm text-text-secondary">
                    remedy currently available
                  </p>
                </div>

                <div className="my-8 h-px bg-border" />

                <div>
                  <p className="text-sm font-semibold text-forest-950">
                    What you can explore
                  </p>

                  <ul className="mt-5 space-y-3 text-sm text-text-secondary">
                    <li>→ Characteristic symptoms</li>
                    <li>→ Mental & physical generals</li>
                    <li>→ Modalities & causation</li>
                    <li>→ System-wise particulars</li>
                    <li>→ Remedy relationships</li>
                    <li>→ Exam-focused revision</li>
                  </ul>
                </div>

                <div className="mt-auto pt-10">
                  <Link
                    href="/materia-medica"
                    className="block border border-forest-950 px-5 py-3 text-center text-sm font-medium text-forest-950 transition-colors hover:bg-forest-950 hover:text-white"
                  >
                    View Medicine Library
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-border bg-white p-10 text-center">
              <p className="text-text-secondary">
                No medicines available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}