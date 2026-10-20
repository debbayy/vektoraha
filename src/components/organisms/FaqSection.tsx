import { ChevronDown } from "lucide-react";
import { Container, Heading, JsonLd } from "@/components/atoms";
import type { FaqItem } from "@/constants/faq";

/** FAQ accordion (native <details>, no JS) plus FAQPage structured data. */
export function FaqSection({ title = "Pertanyaan yang sering ditanyakan", items }: { title?: string; items: FaqItem[] }) {
  return (
    <section className="py-16 sm:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Heading>{title}</Heading>
        <div className="divide-y divide-line rounded-2xl border-2 border-line bg-card">
          {items.map((f) => (
            <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-ink">
                <h3 className="text-base sm:text-lg">{f.q}</h3>
                <ChevronDown className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
