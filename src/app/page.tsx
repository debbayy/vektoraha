import { AdSlot, Container, JsonLd } from "@/components/atoms";
import { FaqSection, FeatureGrid, Hero, HowItWorks, StyleShowcase } from "@/components/organisms";
import { AD_SLOTS, ADSENSE_CLIENT, APP_NAME } from "@/constants";
import { HOME_FAQ } from "@/constants/faq";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: APP_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          inLanguage: "id",
          offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
        }}
      />
      <Hero />
      <FeatureGrid />
      {ADSENSE_CLIENT && AD_SLOTS.home && (
        <Container className="pb-16">
          <AdSlot slot={AD_SLOTS.home} />
        </Container>
      )}
      <StyleShowcase />
      <HowItWorks />
      <FaqSection items={HOME_FAQ} />
    </>
  );
}
