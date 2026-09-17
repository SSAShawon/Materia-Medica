export interface Medicine {
  id: string;
  slug: string;

  name: string;
  commonName?: string;
  scientificName?: string;
  abbreviation?: string;
  synonyms?: string[];

  source?: string;
  origin?: string;
  naturalOrder?: string;
  family?: string;
  kingdom?: string;
  habitat?: string;
  partUsed?: string;
  preparation?: string;

  chemicalConstituents?: string[];
  alkaloids?: string[];
  generalAnalysis?: string;

  sphereOfAction?: string[];

  drugPicture?: {
    generalPicture?: string;
    generalCharacteristics?: string[];
    typicalConstitution?: string;
    temperament?: string;
    generalTendencies?: string[];
    characteristicFeatures?: string[];
  };

  keySymptoms?: {
    keynotes?: string[];
    guidingSymptoms?: string[];
    characteristicSymptoms?: string[];
    indicatingSymptoms?: string[];
  };

  mind?: {
    general?: string[];
    fear?: string[];
    anxiety?: string[];
    irritability?: string[];
    anger?: string[];
    sadness?: string[];
    restlessness?: string[];
    delusions?: string[];
    memory?: string[];
    concentration?: string[];
    desires?: string[];
    aversions?: string[];
  };

  physicalGenerals?: {
    constitution?: string;
    temperament?: string;
    thermalState?: string;
    heatSensitivity?: string;
    coldSensitivity?: string;
    weakness?: string[];
    sensitivity?: string[];
    sidePreference?: string;
    generalTendencies?: string[];
  };

  causation?: string[];

  modalities?: {
    aggravation?: string[];
    amelioration?: string[];
  };

  foodAndAppetite?: {
    appetite?: string;
    cravings?: string[];
    aversions?: string[];
    thirst?: string;
    aggravations?: string[];
    ameliorations?: string[];
  };

  sleepAndDreams?: {
    sleep?: string[];
    insomnia?: string[];
    sleepPosition?: string[];
    dreams?: string[];
  };

  particulars?: {
    head?: string[];
    eyes?: string[];
    ears?: string[];
    nose?: string[];
    face?: string[];
    mouth?: string[];
    tongue?: string[];
    teethAndGums?: string[];
    throat?: string[];
    git?: string[];
    urinary?: string[];
    maleGenital?: string[];
    femaleGenital?: string[];
    respiratory?: string[];
    heartAndCirculation?: string[];
    backAndSpine?: string[];
    extremitiesAndJoints?: string[];
    skin?: string[];
    nerves?: string[];
  };

  fever?: {
    chill?: string[];
    heat?: string[];
    sweat?: string[];
    pattern?: string;
    periodicity?: string;
    time?: string[];
    stages?: string[];
    associatedSymptoms?: string[];
    modalities?: string[];
  };

  haemorrhage?: {
    characterOfBlood?: string;
    color?: string;
    consistency?: string;
    flow?: string;
    quantity?: string;
    causes?: string[];
    modalities?: string[];
    associatedSymptoms?: string[];
  };

  discharges?: {
    color?: string;
    odour?: string;
    consistency?: string;
    quantity?: string;
    character?: string;
    modalities?: string[];
  };

  sensations?: string[];

  locationAndDirection?: {
    location?: string[];
    side?: string;
    direction?: string[];
    radiation?: string[];
  };

  concomitants?: string[];

  pediatric?: {
    general?: string[];
    behaviour?: string[];
    feeding?: string[];
    teething?: string[];
    fever?: string[];
    digestive?: string[];
    characteristicSymptoms?: string[];
  };

  constitutionAndLifeStage?: {
    constitution?: string;
    age?: string;
    sex?: string;
    lifeStage?: string;
    typicalPatientPicture?: string;
  };

  compareWith?: {
    medicine: string;
    similarities?: string[];
    differences?: string[];
    mind?: string[];
    generals?: string[];
    modalities?: string[];
    systems?: string[];
    characteristicSymptoms?: string[];
  }[];

  relationships?: {
    complementary?: string[];
    antidotes?: string[];
    inimical?: string[];
    followsWell?: string[];
    followedWellBy?: string[];
    relatedRemedies?: string[];
  };

  therapeuticApplications?: {
    note?: string;
    applications?: string[];
  };

  quickRevision?: {
    keyPoints?: string[];
    mind?: string[];
    physicalGenerals?: string[];
    modalities?: string[];
    foodAndThirst?: string[];
    majorSystems?: string[];
    characteristicSymptoms?: string[];
    relationships?: string[];
  };

  examFocus?: {
    importantConcepts?: string[];
    frequentlyAskedTopics?: string[];
    shortNoteTopics?: string[];
    compareQuestions?: string[];
    sourceQuestions?: string[];
    constituentQuestions?: string[];
    systemSpecificTopics?: string[];
    characteristicSymptoms?: string[];
    modalities?: string[];
    pediatricTopics?: string[];
    maleTopics?: string[];
    femaleTopics?: string[];
    feverTopics?: string[];
    haemorrhageTopics?: string[];
    coughTopics?: string[];
    gitTopics?: string[];
  };

  traditionalNote?: string;
}