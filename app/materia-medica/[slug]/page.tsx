import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMedicineBySlug } from "@/lib/medicines";
import type { Medicine } from "@/types/medicine";

export const revalidate = 300;

interface MedicinePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: MedicinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const medicine = await getMedicineBySlug(slug);

  if (!medicine) {
    return { title: "Medicine not found — Materia Medica" };
  }

  return {
    title: `${medicine.name} — Materia Medica`,
    description:
      medicine.drugPicture?.generalPicture ??
      `Traditional Homeopathic Materia Medica study notes for ${medicine.name}.`,
  };
}

/* ---------- Small presentational helpers ---------- */

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold-500">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-2xl font-semibold text-forest-950">{title}</h2>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  if (!items?.length) return null;

  return (
    <ul className={`space-y-2 text-sm leading-6 text-text-secondary ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-gold-500">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-text-secondary">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-6 text-forest-950">{value}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-forest-900">{title}</h3>
      <BulletList items={items} className="mt-3" />
    </div>
  );
}

const MIND_LABELS: Array<[keyof NonNullable<Medicine["mind"]>, string]> = [
  ["general", "General"],
  ["fear", "Fear"],
  ["anxiety", "Anxiety"],
  ["irritability", "Irritability"],
  ["anger", "Anger"],
  ["sadness", "Sadness"],
  ["restlessness", "Restlessness"],
  ["delusions", "Delusions"],
  ["memory", "Memory"],
  ["concentration", "Concentration"],
  ["desires", "Desires"],
  ["aversions", "Aversions"],
];

const PARTICULAR_LABELS: Array<[keyof NonNullable<Medicine["particulars"]>, string]> = [
  ["head", "Head"],
  ["eyes", "Eyes"],
  ["ears", "Ears"],
  ["nose", "Nose"],
  ["face", "Face"],
  ["mouth", "Mouth"],
  ["tongue", "Tongue"],
  ["teethAndGums", "Teeth and gums"],
  ["throat", "Throat"],
  ["git", "Gastrointestinal"],
  ["urinary", "Urinary"],
  ["maleGenital", "Male genital"],
  ["femaleGenital", "Female genital"],
  ["respiratory", "Respiratory"],
  ["heartAndCirculation", "Heart and circulation"],
  ["backAndSpine", "Back and spine"],
  ["extremitiesAndJoints", "Extremities and joints"],
  ["skin", "Skin"],
  ["nerves", "Nerves"],
];

const EXAM_LABELS: Array<[keyof NonNullable<Medicine["examFocus"]>, string]> = [
  ["importantConcepts", "Important concepts"],
  ["frequentlyAskedTopics", "Frequently asked topics"],
  ["shortNoteTopics", "Short-note topics"],
  ["compareQuestions", "Comparison questions"],
  ["sourceQuestions", "Source questions"],
  ["constituentQuestions", "Constituent questions"],
  ["systemSpecificTopics", "System-specific topics"],
  ["characteristicSymptoms", "Characteristic symptoms"],
  ["modalities", "Modalities"],
  ["pediatricTopics", "Paediatric topics"],
  ["maleTopics", "Male topics"],
  ["femaleTopics", "Female topics"],
  ["feverTopics", "Fever topics"],
  ["haemorrhageTopics", "Haemorrhage topics"],
  ["coughTopics", "Cough topics"],
  ["gitTopics", "Gastrointestinal topics"],
];

const REVISION_LABELS: Array<[keyof NonNullable<Medicine["quickRevision"]>, string]> = [
  ["keyPoints", "Key points"],
  ["mind", "Mind"],
  ["physicalGenerals", "Physical generals"],
  ["modalities", "Modalities"],
  ["foodAndThirst", "Food and thirst"],
  ["majorSystems", "Major systems"],
  ["characteristicSymptoms", "Characteristic symptoms"],
  ["relationships", "Relationships"],
];

export default async function MedicinePage({ params }: MedicinePageProps) {
  const { slug } = await params;

  const medicine = await getMedicineBySlug(slug);

  if (!medicine) {
    notFound();
  }

  const mindSections = MIND_LABELS.filter(
    ([key]) => (medicine.mind?.[key]?.length ?? 0) > 0,
  );

  const particularSections = PARTICULAR_LABELS.filter(
    ([key]) => (medicine.particulars?.[key]?.length ?? 0) > 0,
  );

  const examSections = EXAM_LABELS.filter(
    ([key]) => (medicine.examFocus?.[key]?.length ?? 0) > 0,
  );

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-500">
            <span>Materia Medica</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span className="text-text-secondary">{medicine.id}</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-forest-950 sm:text-5xl">
            {medicine.name}
          </h1>

          {medicine.scientificName && (
            <p className="mt-3 text-lg italic text-text-secondary">
              {medicine.scientificName}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {medicine.abbreviation && (
              <span className="border border-border bg-white px-3 py-1 text-xs text-forest-900">
                {medicine.abbreviation}
              </span>
            )}

            {medicine.commonName && (
              <span className="border border-border bg-white px-3 py-1 text-xs text-forest-900">
                Common name: {medicine.commonName}
              </span>
            )}

            {medicine.kingdom && (
              <span className="border border-border bg-white px-3 py-1 text-xs text-forest-900">
                Kingdom: {medicine.kingdom}
              </span>
            )}
          </div>

          {medicine.synonyms?.length ? (
            <p className="mt-4 text-xs leading-5 text-text-secondary">
              Also known as {medicine.synonyms.join(", ")}
            </p>
          ) : null}
        </header>

        {/* Basic Information */}
        <Section title="Basic Information">
          <div className="grid gap-6 border border-border bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Abbreviation" value={medicine.abbreviation} />
            <Field label="Source" value={medicine.source} />
            <Field label="Kingdom" value={medicine.kingdom} />
            <Field label="Natural order" value={medicine.naturalOrder} />
            <Field label="Family" value={medicine.family} />
            <Field label="Origin" value={medicine.origin} />
            <Field label="Habitat" value={medicine.habitat} />
            <Field label="Part used" value={medicine.partUsed} />
            <Field label="Preparation" value={medicine.preparation} />
          </div>

          {(medicine.chemicalConstituents?.length ||
            medicine.alkaloids?.length) && (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <ListBlock
                title="Chemical constituents"
                items={medicine.chemicalConstituents}
              />
              <ListBlock
                title="Alkaloids / active principles"
                items={medicine.alkaloids}
              />
            </div>
          )}
        </Section>

        {/* General Analysis */}
        {(medicine.generalAnalysis || medicine.sphereOfAction?.length) && (
          <Section title="General Analysis">
            {medicine.generalAnalysis && (
              <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                {medicine.generalAnalysis}
              </p>
            )}

            {medicine.sphereOfAction?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {medicine.sphereOfAction.map((sphere) => (
                  <span
                    key={sphere}
                    className="bg-sage-100 px-3 py-1.5 text-xs text-forest-900"
                  >
                    {sphere}
                  </span>
                ))}
              </div>
            ) : null}
          </Section>
        )}

        {/* Drug Picture */}
        <Section title="Drug Picture">
          {medicine.drugPicture?.generalPicture && (
            <p className="max-w-3xl text-sm leading-7 text-text-secondary">
              {medicine.drugPicture.generalPicture}
            </p>
          )}

          {medicine.drugPicture?.generalCharacteristics?.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {medicine.drugPicture.generalCharacteristics.map((item) => (
                <div key={item} className="border-l-2 border-gold-500 pl-4 text-sm leading-6 text-forest-950">
                  {item}
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              label="Typical constitution"
              value={medicine.drugPicture?.typicalConstitution}
            />
            <Field
              label="Temperament"
              value={medicine.drugPicture?.temperament}
            />
            <div>
              <BulletList items={medicine.drugPicture?.generalTendencies} />
            </div>
          </div>

          {medicine.drugPicture?.characteristicFeatures?.length ? (
            <div className="mt-8 border border-border bg-white p-6">
              <h3 className="text-sm font-semibold text-forest-900">
                Characteristic features
              </h3>
              <BulletList
                items={medicine.drugPicture.characteristicFeatures}
                className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2"
              />
            </div>
          ) : null}
        </Section>

        {/* Key Symptoms */}
        <Section title="Key Symptoms">
          <div className="grid gap-8 md:grid-cols-2">
            <ListBlock title="Keynotes" items={medicine.keySymptoms?.keynotes} />
            <ListBlock
              title="Guiding symptoms"
              items={medicine.keySymptoms?.guidingSymptoms}
            />
            <ListBlock
              title="Characteristic symptoms"
              items={medicine.keySymptoms?.characteristicSymptoms}
            />
            <ListBlock
              title="Indicating symptoms"
              items={medicine.keySymptoms?.indicatingSymptoms}
            />
          </div>
        </Section>

        {/* Mind */}
        {mindSections.length > 0 && (
          <Section title="Mind">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mindSections.map(([key, label]) => (
                <ListBlock
                  key={key}
                  title={label}
                  items={medicine.mind?.[key]}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Physical Generals */}
        <Section title="Physical Generals">
          <div className="grid gap-6 border border-border bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              label="Constitution"
              value={medicine.physicalGenerals?.constitution}
            />
            <Field
              label="Temperament"
              value={medicine.physicalGenerals?.temperament}
            />
            <Field
              label="Thermal state"
              value={medicine.physicalGenerals?.thermalState}
            />
            <Field
              label="Heat sensitivity"
              value={medicine.physicalGenerals?.heatSensitivity}
            />
            <Field
              label="Cold sensitivity"
              value={medicine.physicalGenerals?.coldSensitivity}
            />
            <Field
              label="Side preference"
              value={medicine.physicalGenerals?.sidePreference}
            />
            <div className="sm:col-span-2 lg:col-span-3">
              <BulletList
                items={medicine.physicalGenerals?.weakness}
                className="grid gap-x-8 gap-y-2 md:grid-cols-2"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <BulletList
                items={medicine.physicalGenerals?.sensitivity}
                className="grid gap-x-8 gap-y-2 md:grid-cols-2"
              />
            </div>
          </div>
        </Section>

        {/* Causation */}
        {medicine.causation?.length ? (
          <Section title="Causation / Ailments From">
            <BulletList
              items={medicine.causation}
              className="grid gap-x-8 gap-y-2 border-l-2 border-gold-500 pl-5 md:grid-cols-2"
            />
          </Section>
        ) : null}

        {/* Modalities */}
        <Section title="Modalities">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-white p-6">
              <h2 className="text-lg font-semibold text-rose-400">
                Aggravation
              </h2>
              <BulletList
                items={medicine.modalities?.aggravation}
                className="mt-4"
              />
            </div>

            <div className="border border-border bg-white p-6">
              <h2 className="text-lg font-semibold text-forest-800">
                Amelioration
              </h2>
              <BulletList
                items={medicine.modalities?.amelioration}
                className="mt-4"
              />
            </div>
          </div>
        </Section>

        {/* Food, Sleep */}
        {(medicine.foodAndAppetite || medicine.sleepAndDreams) && (
          <Section title="Food, Sleep and Dreams">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border border-border bg-white p-6">
                <h3 className="text-sm font-semibold text-forest-900">
                  Food, appetite and thirst
                </h3>
                <div className="mt-4 space-y-4">
                  <Field
                    label="Appetite"
                    value={medicine.foodAndAppetite?.appetite}
                  />
                  <Field label="Thirst" value={medicine.foodAndAppetite?.thirst} />
                  <ListBlock
                    title="Cravings"
                    items={medicine.foodAndAppetite?.cravings}
                  />
                  <ListBlock
                    title="Aversions"
                    items={medicine.foodAndAppetite?.aversions}
                  />
                  <ListBlock
                    title="Aggravations"
                    items={medicine.foodAndAppetite?.aggravations}
                  />
                  <ListBlock
                    title="Ameliorations"
                    items={medicine.foodAndAppetite?.ameliorations}
                  />
                </div>
              </div>

              <div className="border border-border bg-white p-6">
                <h3 className="text-sm font-semibold text-forest-900">
                  Sleep and dreams
                </h3>
                <div className="mt-4 space-y-4">
                  <ListBlock title="Sleep" items={medicine.sleepAndDreams?.sleep} />
                  <ListBlock
                    title="Insomnia"
                    items={medicine.sleepAndDreams?.insomnia}
                  />
                  <ListBlock
                    title="Sleep position"
                    items={medicine.sleepAndDreams?.sleepPosition}
                  />
                  <ListBlock
                    title="Dreams"
                    items={medicine.sleepAndDreams?.dreams}
                  />
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Particulars */}
        {particularSections.length > 0 && (
          <Section title="System-wise Particulars">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {particularSections.map(([key, label]) => (
                <ListBlock
                  key={key}
                  title={label}
                  items={medicine.particulars?.[key]}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Fever */}
        {medicine.fever && (
          <Section title="Fever">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <ListBlock title="Chill" items={medicine.fever.chill} />
                <ListBlock title="Heat" items={medicine.fever.heat} />
                <ListBlock title="Sweat" items={medicine.fever.sweat} />
                <Field label="Pattern" value={medicine.fever.pattern} />
                <Field
                  label="Periodicity"
                  value={medicine.fever.periodicity}
                />
              </div>

              <div className="space-y-4">
                <ListBlock title="Time" items={medicine.fever.time} />
                <ListBlock title="Stages" items={medicine.fever.stages} />
                <ListBlock
                  title="Associated symptoms"
                  items={medicine.fever.associatedSymptoms}
                />
                <ListBlock title="Modalities" items={medicine.fever.modalities} />
              </div>
            </div>
          </Section>
        )}

        {/* Haemorrhage and discharges */}
        {(medicine.haemorrhage || medicine.discharges) && (
          <Section title="Haemorrhage and Discharges">
            <div className="grid gap-8 md:grid-cols-2">
              {medicine.haemorrhage && (
                <div className="border border-border bg-white p-6">
                  <h3 className="text-sm font-semibold text-forest-900">
                    Haemorrhage
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Field
                      label="Character of blood"
                      value={medicine.haemorrhage.characterOfBlood}
                    />
                    <Field label="Colour" value={medicine.haemorrhage.color} />
                    <Field
                      label="Consistency"
                      value={medicine.haemorrhage.consistency}
                    />
                    <Field label="Flow" value={medicine.haemorrhage.flow} />
                    <Field
                      label="Quantity"
                      value={medicine.haemorrhage.quantity}
                    />
                    <ListBlock
                      title="Causes"
                      items={medicine.haemorrhage.causes}
                    />
                    <ListBlock
                      title="Modalities"
                      items={medicine.haemorrhage.modalities}
                    />
                    <ListBlock
                      title="Associated symptoms"
                      items={medicine.haemorrhage.associatedSymptoms}
                    />
                  </div>
                </div>
              )}

              {medicine.discharges && (
                <div className="border border-border bg-white p-6">
                  <h3 className="text-sm font-semibold text-forest-900">
                    Discharges
                  </h3>
                  <div className="mt-4 space-y-4">
                    <Field label="Colour" value={medicine.discharges.color} />
                    <Field label="Odour" value={medicine.discharges.odour} />
                    <Field
                      label="Consistency"
                      value={medicine.discharges.consistency}
                    />
                    <Field label="Quantity" value={medicine.discharges.quantity} />
                    <Field
                      label="Character"
                      value={medicine.discharges.character}
                    />
                    <ListBlock
                      title="Modalities"
                      items={medicine.discharges.modalities}
                    />
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Sensations and location */}
        {(medicine.sensations?.length || medicine.locationAndDirection) && (
          <Section title="Sensations, Location and Direction">
            <div className="grid gap-8 md:grid-cols-2">
              <ListBlock title="Sensations" items={medicine.sensations} />
              <div className="space-y-4">
                <ListBlock
                  title="Location"
                  items={medicine.locationAndDirection?.location}
                />
                <Field
                  label="Side"
                  value={medicine.locationAndDirection?.side}
                />
                <ListBlock
                  title="Direction"
                  items={medicine.locationAndDirection?.direction}
                />
                <ListBlock
                  title="Radiation"
                  items={medicine.locationAndDirection?.radiation}
                />
              </div>
            </div>
          </Section>
        )}

        {/* Concomitants */}
        {medicine.concomitants?.length ? (
          <Section title="Concomitants">
            <BulletList
              items={medicine.concomitants}
              className="grid gap-x-8 gap-y-2 md:grid-cols-2"
            />
          </Section>
        ) : null}

        {/* Pediatric */}
        {medicine.pediatric && (
          <Section title="Paediatric Picture">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ListBlock title="General" items={medicine.pediatric.general} />
              <ListBlock title="Behaviour" items={medicine.pediatric.behaviour} />
              <ListBlock title="Feeding" items={medicine.pediatric.feeding} />
              <ListBlock title="Teething" items={medicine.pediatric.teething} />
              <ListBlock title="Fever" items={medicine.pediatric.fever} />
              <ListBlock title="Digestive" items={medicine.pediatric.digestive} />
              <ListBlock
                title="Characteristic symptoms"
                items={medicine.pediatric.characteristicSymptoms}
              />
            </div>
          </Section>
        )}

        {/* Constitution and life stage */}
        {medicine.constitutionAndLifeStage && (
          <Section title="Constitution, Age and Life Stage">
            <div className="grid gap-6 border border-border bg-white p-6 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Constitution"
                value={medicine.constitutionAndLifeStage.constitution}
              />
              <Field label="Age" value={medicine.constitutionAndLifeStage.age} />
              <Field label="Sex" value={medicine.constitutionAndLifeStage.sex} />
              <Field
                label="Life stage"
                value={medicine.constitutionAndLifeStage.lifeStage}
              />
              <div className="sm:col-span-2 lg:col-span-3">
                <Field
                  label="Typical patient picture"
                  value={medicine.constitutionAndLifeStage.typicalPatientPicture}
                />
              </div>
            </div>
          </Section>
        )}

        {/* Comparisons */}
        {medicine.compareWith?.length ? (
          <Section title="Remedy Comparisons">
            <div className="grid gap-6 md:grid-cols-2">
              {medicine.compareWith.map((comparison) => (
                <div
                  key={comparison.medicine}
                  className="border border-border bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-forest-950">
                    {medicine.name} <span className="text-gold-500">vs</span>{" "}
                    {comparison.medicine}
                  </h3>

                  <div className="mt-4 space-y-4">
                    <ListBlock
                      title="Similarities"
                      items={comparison.similarities}
                    />
                    <ListBlock
                      title="Differences"
                      items={comparison.differences}
                    />
                    <ListBlock title="Mind" items={comparison.mind} />
                    <ListBlock title="Generals" items={comparison.generals} />
                    <ListBlock
                      title="Modalities"
                      items={comparison.modalities}
                    />
                    <ListBlock title="Systems" items={comparison.systems} />
                    <ListBlock
                      title="Characteristic symptoms"
                      items={comparison.characteristicSymptoms}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Relationships */}
        {medicine.relationships &&
          Object.values(medicine.relationships).some(
            (items) => items && items.length > 0,
          ) && (
            <Section title="Remedy Relationships">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <ListBlock
                  title="Complementary"
                  items={medicine.relationships.complementary}
                />
                <ListBlock
                  title="Antidotes"
                  items={medicine.relationships.antidotes}
                />
                <ListBlock
                  title="Inimical"
                  items={medicine.relationships.inimical}
                />
                <ListBlock
                  title="Follows well"
                  items={medicine.relationships.followsWell}
                />
                <ListBlock
                  title="Followed well by"
                  items={medicine.relationships.followedWellBy}
                />
                <ListBlock
                  title="Related remedies"
                  items={medicine.relationships.relatedRemedies}
                />
              </div>
            </Section>
          )}

        {/* Traditional applications */}
        {medicine.therapeuticApplications && (
          <Section title="Traditional Educational Applications">
            <div className="border-l-4 border-gold-500 bg-sage-100 p-6">
              {medicine.therapeuticApplications.note && (
                <p className="text-xs leading-6 text-text-secondary">
                  {medicine.therapeuticApplications.note}
                </p>
              )}

              <BulletList
                items={medicine.therapeuticApplications.applications}
                className="mt-4"
              />
            </div>
          </Section>
        )}

        {/* Quick Revision */}
        {medicine.quickRevision && (
          <section className="mt-12 bg-forest-950 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-400">
              Quick Revision
            </p>

            <h2 className="mt-2 text-2xl font-semibold">Remember These</h2>

            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {REVISION_LABELS.filter(
                ([key]) => (medicine.quickRevision?.[key]?.length ?? 0) > 0,
              ).map(([key, label]) => (
                <div key={key}>
                  <h3 className="text-xs uppercase tracking-[0.15em] text-gold-400">
                    {label}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
                    {medicine.quickRevision?.[key]?.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exam Focus */}
        {examSections.length > 0 && (
          <Section title="Exam Focus" eyebrow="Examination reference">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {examSections.map(([key, label]) => (
                <ListBlock
                  key={key}
                  title={label}
                  items={medicine.examFocus?.[key]}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Traditional Note */}
        <section className="mt-12 border-l-4 border-gold-500 bg-sage-100 p-6">
          <h2 className="font-semibold text-forest-950">Educational Note</h2>

          <p className="mt-2 text-sm leading-7 text-text-secondary">
            {medicine.traditionalNote ??
              "This entry organizes traditional Homeopathic Materia Medica descriptions for educational and examination-reference purposes. It is not evidence-based medical treatment advice."}
          </p>
        </section>
      </article>
    </main>
  );
}
