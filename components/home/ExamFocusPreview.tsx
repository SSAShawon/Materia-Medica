import Link from "next/link";

const topics = [
  {
    number: "01",
    title: "Characteristic Symptoms",
    description:
      "Identify the distinctive symptoms that form the core of a remedy picture.",
  },
  {
    number: "02",
    title: "Guiding Symptoms",
    description:
      "Review the important guiding features used in traditional Materia Medica study.",
  },
  {
    number: "03",
    title: "Modalities",
    description:
      "Study what aggravates or ameliorates symptoms and how they change.",
  },
  {
    number: "04",
    title: "Source & Constituents",
    description:
      "Revise source, origin, preparation and important constituents of remedies.",
  },
  {
    number: "05",
    title: "System-wise Topics",
    description:
      "Explore GIT, respiratory, urinary, genital, fever and other systems.",
  },
  {
    number: "06",
    title: "Compare Remedies",
    description:
      "Understand similarities and differences between commonly compared remedies.",
  },
];

export default function ExamFocusPreview() {
  return (
    <section className="border-y border-border bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Examination Reference
            </p>

            <h2 className="mt-3 max-w-md text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Study with the questions in mind.
            </h2>
          </div>

          <div className="max-w-2xl lg:ml-auto">
            <p className="text-base leading-8 text-text-secondary">
              Organize your Materia Medica preparation around the types
              of topics commonly encountered in examination questions.
              Explore symptoms, modalities, systems, remedy comparisons
              and source-related topics in one structured place.
            </p>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic.number}
              className="group border-b border-r border-border p-7 transition-colors hover:bg-sage-100/60 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium tracking-[0.15em] text-gold-500">
                  {topic.number}
                </span>

                <span className="text-lg text-forest-800 opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <h3 className="mt-10 text-xl font-semibold text-forest-950">
                {topic.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {topic.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium text-forest-950">
              Build your revision path.
            </p>

            <p className="mt-1 text-sm text-text-secondary">
              Explore topics, questions and exam-focused study material.
            </p>
          </div>

          <Link
            href="/exam-focus"
            className="inline-flex items-center justify-center bg-forest-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-900"
          >
            Explore Exam Focus
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}