import Link from "next/link";

const relationships = [
  {
    label: "Complementary",
    remedy: "Complementary Remedies",
    description:
      "Explore remedies traditionally described as complementary to another remedy picture.",
    href: "/materia-medica",
  },
  {
    label: "Antidotes",
    remedy: "Antidotal Relationships",
    description:
      "Review traditional antidotal relationships and the remedies associated with them.",
    href: "/materia-medica",
  },
  {
    label: "Follows Well",
    remedy: "Remedies That Follow",
    description:
      "Study traditional remedy sequences and relationships described in Materia Medica.",
    href: "/materia-medica",
  },
  {
    label: "Inimical",
    remedy: "Incompatible Relationships",
    description:
      "Explore traditionally described incompatible or inimical remedy relationships.",
    href: "/materia-medica",
  },
];

export default function RemedyRelationships() {
  return (
    <section className="border-y border-border bg-forest-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Intro */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
              Remedy Relationships
            </p>

            <h2 className="mt-4 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
              Remedies do not exist in isolation.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Traditional Materia Medica describes relationships between
              remedies. Use these connections to explore complementary,
              antidotal and other traditionally described relationships.
            </p>

            <Link
              href="/materia-medica"
              className="mt-8 inline-flex items-center border-b border-gold-400 pb-1 text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
            >
              Explore the remedy library
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Relationship list */}
          <div className="border-t border-white/10">
            {relationships.map((relationship, index) => (
              <Link
                key={relationship.label}
                href={relationship.href}
                className="group grid gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.03] sm:grid-cols-[90px_1fr_auto] sm:items-center"
              >
                <span className="text-xs tracking-[0.15em] text-gold-400">
                  0{index + 1}
                </span>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    {relationship.label}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {relationship.remedy}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                    {relationship.description}
                  </p>
                </div>

                <span className="text-lg text-gold-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.15em] text-white/30">
            Traditional Materia Medica reference
          </p>

          <p className="max-w-xl text-xs leading-6 text-white/35 sm:text-right">
            Relationships are presented as traditional educational
            reference material and should not be interpreted as
            evidence-based medical treatment guidance.
          </p>
        </div>
      </div>
    </section>
  );
}