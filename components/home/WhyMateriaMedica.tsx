import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Structured Remedy Profiles",
    description:
      "Explore each remedy through a consistent structure covering keynotes, generals, modalities, systems, relationships and revision points.",
  },
  {
    number: "02",
    title: "Symptom-first Exploration",
    description:
      "Study symptoms by location, sensation, modality, concomitant and body system instead of searching only by medicine name.",
  },
  {
    number: "03",
    title: "Examination-focused Study",
    description:
      "Organize important Materia Medica topics around characteristic symptoms, source, constituents, systems, comparisons and other common question patterns.",
  },
  {
    number: "04",
    title: "Compare Remedies",
    description:
      "Place remedies side by side to understand similarities, differences, modalities and characteristic features.",
  },
  {
    number: "05",
    title: "Questions & Quizzes",
    description:
      "Practice with question-bank material and MCQs designed around medicines, systems, topics and examination preparation.",
  },
  {
    number: "06",
    title: "Personal Study Space",
    description:
      "Save useful material, bookmark remedies and eventually track your own study activity from one dedicated space.",
  },
];

export default function WhyMateriaMedica() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              The Study Experience
            </p>

            <h2 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Materia Medica, organized for the way you study.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-text-secondary lg:ml-auto">
            Instead of keeping scattered notes, questions and remedy
            information in different places, this platform brings the
            major parts of Materia Medica study into one structured
            learning environment.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group min-h-[260px] border-b border-r border-border p-7 transition-colors hover:bg-sage-100/50 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium tracking-[0.15em] text-gold-500">
                  {feature.number}
                </span>

                <span className="text-lg text-forest-800 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <h3 className="mt-12 text-xl font-semibold text-forest-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-forest-950">
              Ready to explore?
            </p>

            <p className="mt-1 text-sm text-text-secondary">
              Start with the Materia Medica library or explore symptoms.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/materia-medica"
              className="bg-forest-950 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-forest-900"
            >
              Browse Medicines
            </Link>

            <Link
              href="/symptoms"
              className="border border-border px-6 py-3 text-center text-sm font-medium text-forest-950 transition-colors hover:border-forest-800"
            >
              Explore Symptoms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}