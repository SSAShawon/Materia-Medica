import Hero from "@/components/home/Hero";
import FeaturedMedicines from "@/components/home/FeaturedMedicines";
import ExamFocusPreview from "@/components/home/ExamFocusPreview";
import StudyBySystem from "@/components/home/StudyBySystem";
import QuickStudyTools from "@/components/home/QuickStudyTools";
import RemedyRelationships from "@/components/home/RemedyRelationships";
import ContinueLearning from "@/components/home/ContinueLearning";
import WhyMateriaMedica from "@/components/home/WhyMateriaMedica";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedMedicines />
      <ExamFocusPreview />
      <StudyBySystem/>
      <QuickStudyTools/>
      <RemedyRelationships/>
      <ContinueLearning/>
      <WhyMateriaMedica/>
      <HomeFinalCTA/>
    </main>
  );
}