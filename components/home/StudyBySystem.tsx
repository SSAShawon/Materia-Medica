import Link from "next/link";

const systems = [
  {
    name: "Mind",
    description: "Mental and emotional symptoms",
    href: "/symptoms?system=mind",
    featured: true,
  },
  {
    name: "Respiratory",
    description: "Cough, chest and breathing",
    href: "/symptoms?system=respiratory",
  },
  {
    name: "Gastrointestinal",
    description: "Stomach, abdomen and stool",
    href: "/symptoms?system=git",
  },
  {
    name: "Urinary",
    description: "Urination and urinary symptoms",
    href: "/symptoms?system=urinary",
  },
  {
    name: "Female Genital",
    description: "Menstruation and female symptoms",
    href: "/symptoms?system=female-genital",
  },
  {
    name: "Male Genital",
    description: "Male genital and sexual symptoms",
    href: "/symptoms?system=male-genital",
  },
  {
    name: "Fever",
    description: "Chill, heat and sweat patterns",
    href: "/symptoms?system=fever",
  },
  {
    name: "Extremities",
    description: "Joints, limbs and movement",
    href: "/symptoms?system=extremities",
  },
  {
    name: "Skin",
    description: "Skin symptoms and discharges",
    href: "/symptoms?system=skin",
  },
];

export default function StudyBySystem() {
  return (
    <section className="bg-sage-100/40 px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Symptom Explorer
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Study by system.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-text-secondary">
            Move beyond individual remedies and explore Materia Medica
            through symptom locations and body systems.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">

          {/* Featured System */}
          <Link
            href={systems[0].href}
            className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-forest-950 p-8 transition-transform hover:-translate-y-1 lg:row-span-2"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-400/20" />

            <div className="relative">
              <span className="text-xs uppercase tracking-[0.2em] text-gold-400">
                Start here
              </span>

              <h3 className="mt-8 text-4xl font-semibold text-white">
                {systems[0].name}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
                {systems[0].description}. Explore the mental picture,
                emotions, fears, anxieties and characteristic symptoms
                described in traditional Materia Medica.
              </p>
            </div>

            <div className="relative flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs text-white/40">
                Explore symptoms
              </span>

              <span className="text-gold-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>

          {/* Remaining Systems */}
          {systems.slice(1).map((system) => (
            <Link
              key={system.name}
              href={system.href}
              className="group border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-forest-800"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-medium text-gold-500">
                  0{systems.indexOf(system) + 1}
                </span>

                <span className="text-forest-800 opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <h3 className="mt-8 text-xl font-semibold text-forest-950">
                {system.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {system.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="mt-8 text-center">
          <Link
            href="/symptoms"
            className="inline-flex items-center border-b border-forest-950 pb-1 text-sm font-medium text-forest-950 transition-colors hover:border-gold-500 hover:text-gold-500"
          >
            Explore all symptoms
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}