import { notFound } from "next/navigation";
import { getMedicineBySlug } from "@/lib/medicines";

interface MedicinePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MedicinePage({
  params,
}: MedicinePageProps) {
  const { slug } = await params;

  const medicine = getMedicineBySlug(slug);

  if (!medicine) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold-500">
            Materia Medica
          </p>

          <h1 className="mt-3 text-5xl font-bold text-forest-950">
            {medicine.name}
          </h1>

          <p className="mt-3 text-lg text-text-secondary">
            {medicine.scientificName}
          </p>
        </section>

        {/* Basic Information */}
        <section className="mt-12 border border-border bg-white p-8">
          <h2 className="text-2xl font-semibold text-forest-950">
            Basic Information
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-text-secondary">Abbreviation</p>
              <p className="mt-1 font-medium">
                {medicine.abbreviation}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Source</p>
              <p className="mt-1 font-medium">
                {medicine.source}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Origin</p>
              <p className="mt-1 font-medium">
                {medicine.origin}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">Part Used</p>
              <p className="mt-1 font-medium">
                {medicine.partUsed}
              </p>
            </div>
          </div>
        </section>

        {/* Drug Picture */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-forest-950">
            Drug Picture
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
            {medicine.drugPicture?.generalPicture}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {medicine.drugPicture?.generalCharacteristics?.map(
              (item) => (
                <div
                  key={item}
                  className="border-l-2 border-gold-500 pl-4"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </section>

        {/* Key Symptoms */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-forest-950">
            Key Symptoms
          </h2>

          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-forest-900">
                Keynotes
              </h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.keySymptoms?.keynotes?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-forest-900">
                Guiding Symptoms
              </h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.keySymptoms?.guidingSymptoms?.map(
                  (item) => (
                    <li key={item}>• {item}</li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-forest-900">
                Characteristic Symptoms
              </h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.keySymptoms?.characteristicSymptoms?.map(
                  (item) => (
                    <li key={item}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Mind */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-forest-950">
            Mind
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">General</h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.mind?.general?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Fear</h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.mind?.fear?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Anxiety</h3>

              <ul className="mt-3 space-y-2 text-text-secondary">
                {medicine.mind?.anxiety?.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Physical Generals */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-forest-950">
            Physical Generals
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-text-secondary">
                Constitution
              </p>
              <p className="mt-1">
                {medicine.physicalGenerals?.constitution}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">
                Thermal State
              </p>
              <p className="mt-1">
                {medicine.physicalGenerals?.thermalState}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary">
                Weakness
              </p>

              <ul className="mt-1 text-text-secondary">
                {medicine.physicalGenerals?.weakness?.map(
                  (item) => (
                    <li key={item}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Modalities */}
        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-rose-400">
              Aggravation
            </h2>

            <ul className="mt-4 space-y-2 text-text-secondary">
              {medicine.modalities?.aggravation?.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-forest-800">
              Amelioration
            </h2>

            <ul className="mt-4 space-y-2 text-text-secondary">
              {medicine.modalities?.amelioration?.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick Revision */}
        <section className="mt-12 bg-forest-950 p-8 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-gold-400">
            Quick Revision
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Remember These
          </h2>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {medicine.quickRevision?.keyPoints?.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        {/* Traditional Note */}
        <section className="mt-12 border-l-4 border-gold-500 bg-sage-100 p-6">
          <h2 className="font-semibold text-forest-950">
            Educational Note
          </h2>

          <p className="mt-2 leading-7 text-text-secondary">
            {medicine.traditionalNote}
          </p>
        </section>
      </div>
    </main>
  );
}