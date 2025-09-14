import Hero from "@/components/Hero";
import WhyCurvFi from "@/components/WhyCurvFi";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffect";

export default function Page() {
  return (
    <main className="relative  text-white">
      {/* Full-page animated background */}
      <BackgroundEffects />

      {/* All content on top */}
      <div className="relative z-10">
        <Hero />
        <WhyCurvFi />
        <UseCases />
        <HowItWorks />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
