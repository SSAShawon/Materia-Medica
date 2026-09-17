import Link from "next/link";

const exploreLinks = [
  { label: "Materia Medica", href: "/materia-medica" },
  { label: "Symptoms", href: "/symptoms" },
  { label: "Study Notes", href: "/study-notes" },
  { label: "Exam Focus", href: "/exam-focus" },
];

const studyLinks = [
  { label: "Question Bank", href: "/question-bank" },
  { label: "MCQ & Quiz", href: "/quiz" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Repertory", href: "/repertory" },
];

const accountLinks = [
  { label: "My Study", href: "/my-study" },
  { label: "Search", href: "/search" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-forest-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-gold-400 text-lg font-semibold text-gold-400">
                M
              </div>

              <div>
                <p className="text-xl font-semibold">
                  Materia Medica
                </p>

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  Study & Reference
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
              A structured Homeopathic Materia Medica study and
              reference platform designed to help students explore
              remedies, symptoms, concepts and examination topics.
            </p>

            <div className="mt-7">
              <span className="inline-block border border-gold-400/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-400">
                Educational Reference
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-400">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-400">
              Study
            </h3>

            <ul className="mt-5 space-y-3">
              {studyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-400">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Materia Medica. All rights reserved.
          </p>

          <p>
            Built for learning • Reference • Revision
          </p>
        </div>

      </div>
    </footer>
  );
}