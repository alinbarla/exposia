import Hero from "@/components/hero";
import SocialProof from "@/components/social-proof";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import FaqSection from "@/components/faq";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white">
      <article itemScope itemType="https://schema.org/Article">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FaqSection />
        <Cta />
      </article>
    </div>
  );
}
