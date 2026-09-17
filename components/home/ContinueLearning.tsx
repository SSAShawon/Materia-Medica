import Link from "next/link";

const learningItems = [
  {
    type: "REMEDY",
    title: "Arsenicum Album",
    description:
      "Review the remedy picture, keynotes, modalities and examination-focused points.",
    progress: "Continue reading",
    href: "/materia-medica/arsenicum-album",
  },
  {
    type: "TOPIC",
    title: "Characteristic Symptoms",
    description:
      "Review the distinctive symptoms that help define an individual remedy picture.",
    progress: "Explore topic",
    href: "/exam-focus",
  },
  {
    type: "PRACTICE",
    title: "Materia Medica Questions",
    description:
      "Test your understanding with structured questions organized around important topics.",
    progress: "Practice now",
    href: "/question-bank",
  },
];

export default function ContinueLearning() {
  return (
    <section className="bg-ivory-100 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              Continue Learning
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-forest-950 sm:text-5xl">
              Pick up where you left off.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-text-secondary">
            Keep your study journey organized with quick access to
            remedies, important topics and practice material.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {learningItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative overflow-hidden border p-7 transition-all hover:-translate-y-1 ${
                index === 0
                  ? "border-forest-950 bg-forest-950 text-white"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.2em] ${
                    index === 0 ? "text-gold-400" : "text-gold-500"
                  }`}
                >
                  {item.type}
                </span>

                <span
                  className={`text-xs ${
                    index === 0 ? "text-white/30" : "text-text-secondary"
                  }`}
                >
                  0{index + 1}
                </span>
              </div>

              <h3
                className={`mt-10 text-2xl font-semibold ${
                  index === 0 ? "text-white" : "text-forest-950"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`mt-3 text-sm leading-7 ${
                  index === 0 ? "text-white/55" : "text-text-secondary"
                }`}
              >
                {item.description}
              </p>

              <div
                className={`mt-10 flex items-center justify-between border-t pt-5 ${
                  index === 0 ? "border-white/10" : "border-border"
                }`}
              >
                <span
                  className={`text-xs ${
                    index === 0 ? "text-white/40" : "text-text-secondary"
                  }`}
                >
                  {item.progress}
                </span>

                <span
                  className={`transition-transform group-hover:translate-x-1 ${
                    index === 0 ? "text-gold-400" : "text-forest-800"
                  }`}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Personal study tracking will be available in My Study.
          </p>

          <Link
            href="/my-study"
            className="inline-flex items-center text-sm font-medium text-forest-950 transition-colors hover:text-gold-500"
          >
            Open My Study
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}