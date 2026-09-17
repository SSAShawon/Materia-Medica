import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-ivory-50">
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold-500/20" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-forest-800/10" />

      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">

        {/* Left Content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-3 border border-border bg-white px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-gold-500" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-forest-900">
              Educational Reference
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-forest-950 sm:text-6xl lg:text-7xl">
            Explore the
            <span className="block font-serif italic font-normal text-forest-800">
              language of remedies.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
            A structured Homeopathic Materia Medica reference designed
            for students to explore medicines, symptoms, modalities,
            remedy relationships and examination-focused topics.
          </p>

          {/* Search */}
          <div className="mt-9 max-w-2xl">
            <div className="flex flex-col gap-3 border border-border bg-white p-2 shadow-[0_12px_40px_rgba(15,61,53,0.06)] sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-4">
                <span className="text-lg text-text-secondary">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search a medicine, symptom or topic..."
                  className="w-full bg-transparent py-3 text-sm text-forest-950 outline-none placeholder:text-text-secondary/70"
                />
              </div>

              <Link
                href="/search"
                className="bg-forest-950 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-forest-900"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/materia-medica"
              className="bg-forest-950 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-forest-900"
            >
              Browse Medicines
            </Link>

            <Link
              href="/exam-focus"
              className="border border-border bg-white px-6 py-3 text-center text-sm font-medium text-forest-950 transition-colors hover:border-forest-800"
            >
              Explore Exam Focus
            </Link>
          </div>

          {/* Small Stats */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
            <div>
              <p className="text-xl font-semibold text-forest-950">
                01
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-text-secondary">
                Remedy Library
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-forest-950">
                30+
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-text-secondary">
                Study Sections
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-forest-950">
                BHMS
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-text-secondary">
                Study Focus
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">

          {/* Main Panel */}
          <div className="relative border border-forest-950 bg-forest-950 p-6 shadow-[20px_20px_0px_rgba(201,162,39,0.18)] sm:p-8">

            {/* Top */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400">
                  Featured Remedy
                </p>

                <p className="mt-1 text-sm text-white/50">
                  Materia Medica
                </p>
              </div>

              <span className="text-xs text-white/40">
                MED-001
              </span>
            </div>

            {/* Remedy */}
            <div className="py-12">
              <p className="text-sm italic text-gold-400">
                Ars.
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Arsenicum
                <span className="block font-serif italic font-normal text-white/70">
                  Album
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                A structured remedy profile with key symptoms,
                modalities, mental picture, physical generals,
                systems and examination-focused revision points.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["Keynotes", "Mind", "Modalities", "Exam Focus"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 px-3 py-1.5 text-[11px] text-white/60"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Bottom */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs text-white/40">
                Structured reference
              </span>

              <Link
                href="/materia-medica/arsenicum-album"
                className="text-xs font-medium text-gold-400 transition-colors hover:text-gold-500"
              >
                View Remedy →
              </Link>
            </div>
          </div>

          {/* Floating Accent */}
          <div className="absolute -right-4 -top-5 hidden border border-gold-500/40 bg-ivory-50 px-4 py-3 sm:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-text-secondary">
              Study
            </p>

            <p className="mt-1 text-sm font-semibold text-forest-950">
              Learn · Revise · Compare
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}