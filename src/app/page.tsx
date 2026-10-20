import { AdSlot, Container } from "@/components/atoms";
import { FeatureGrid, Hero, HowItWorks, StyleShowcase } from "@/components/organisms";
import { AD_SLOTS, ADSENSE_CLIENT } from "@/constants";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      {ADSENSE_CLIENT && AD_SLOTS.home && (
        <Container className="pb-16">
          <AdSlot slot={AD_SLOTS.home} />
        </Container>
      )}
      <StyleShowcase />
      <HowItWorks />
    </>
  );
}
