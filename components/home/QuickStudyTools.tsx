import Link from "next/link";

const studyTools = [
  {
    number: "01",
    title: "Quick Revision",
    description:
      "Review important keynotes, modalities, symptoms and remedy relationships in a compact format.",
    href: "/exam-focus",
    label: "Revise",
  },
  {
    number: "02",
    title: "Question Bank",
    description:
      "Explore previous and curated Materia Medica questions organized by topic, year and question type.",
    href: "/question-bank",
    label: "Practice",
  },
  {
    number: "03",
    title: "MCQ & Quiz",
    description:
      "Test your understanding with medicine-wise, system-wise and examination-focused questions.",
    href: "/quiz",
    label: "Test yourself",
  },
  {
    number: "04",
    title: "Compare Remedies",
    description:
      "Study similarities and differences between remedies through a structured side-by-side comparison.",
    href: "/materia-medica/compare",
    label: "Compare",
  },
];

export default function QuickStudyTools() {
  return (
    <section className="bg-ivory-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          {/* Left editorial block */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Study Tools
            </p>

            <h2 className="mt-3 max-w-md text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Everything you need to revise.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary">
              Move from reading to active study with focused tools for
              revision, practice, comparison and self-assessment.
            </p>

            <Link
              href="/my-study"
              className="mt-8 inline-flex items-center border-b border-forest-950 pb-1 text-sm font-medium text-forest-950 transition-colors hover:border-gold-500 hover:text-gold-500"
            >
              Open My Study
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Tools */}
          <div className="border-t border-border">
            {studyTools.map((tool) => (
              <Link
                key={tool.number}
                href={tool.href}
                className="group grid gap-6 border-b border-border py-8 transition-colors hover:bg-sage-100/40 sm:grid-cols-[70px_1fr_auto] sm:items-center"
              >
                <span className="text-xs font-medium tracking-[0.15em] text-gold-500">
                  {tool.number}
                </span>

                <div>
                  <h3 className="text-xl font-semibold text-forest-950 transition-colors group-hover:text-forest-800">
                    {tool.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-text-secondary">
                    {tool.label}
                  </span>

                  <span className="text-lg text-forest-800 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}