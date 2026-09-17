import Link from "next/link";

export default function HomeFinalCTA() {
  return (
    <section className="bg-ivory-50 px-6 pb-24 pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Main CTA */}
        <div className="relative overflow-hidden bg-forest-950 px-8 py-16 sm:px-12 lg:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-400/20" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/5" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
                Begin Your Study
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build a deeper understanding of Materia Medica.
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                Explore remedies, symptoms, examination topics and
                study resources through one structured reference
                platform.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/materia-medica"
                className="bg-gold-400 px-7 py-3 text-center text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-500"
              >
                Explore Medicines
              </Link>

              <Link
                href="/exam-focus"
                className="border border-white/15 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:border-white/30"
              >
                Study for Exams
              </Link>
            </div>
          </div>
        </div>

        {/* Educational note */}
        <div className="mt-10 border-y border-border py-7">
          <div className="grid gap-5 md:grid-cols-[180px_1fr] md:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
                Important Note
              </p>
            </div>

            <p className="max-w-4xl text-sm leading-7 text-text-secondary">
              This platform is designed for educational and academic
              reference. Remedy descriptions, symptom pictures,
              relationships and traditional applications are presented
              within the context of Homeopathic Materia Medica study.
              They should not be interpreted as evidence-based medical
              diagnosis or treatment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}