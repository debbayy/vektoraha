import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { ReactNode } from "react";
import { Badge, Container, Heading } from "@/components/atoms";
import { ADSENSE_CLIENT, CONTACT_EMAIL } from "@/constants";

export const metadata: Metadata = pageMetadata({
  title: "Kebijakan Privasi",
  description:
    "Bagaimana VektorAha memproses foto, data analitik, dan iklan.",
  path: "/kebijakan-privasi",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      <div className="space-y-3 leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

const linkClass = "font-semibold text-accent-dark underline underline-offset-4";

export default function PrivacyPage() {
  return (
    <Container className="py-10 sm:py-14">
      <article className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-3">
          <Badge tone="neutral">Terakhir diperbarui: 20 Oktober 2026</Badge>
          <Heading level={1} className="text-3xl sm:text-4xl lg:text-5xl">
            Kebijakan Privasi
          </Heading>
          <p className="leading-relaxed text-ink-soft">
            Halaman ini menjelaskan data apa yang diproses saat kamu memakai VektorAha dan untuk apa.
          </p>
        </header>

        <Section title="Foto yang kamu unggah">
          <p>
            Foto dikecilkan dan diperiksa langsung di browsermu. Fitur <strong>hapus latar</strong> pada Pasfoto
            Studio berjalan sepenuhnya di perangkatmu, jadi fotonya tidak dikirim ke mana pun.
          </p>
          <p>
            Untuk fitur yang memakai AI (Gaya Anime dan mode Studio AI), foto dikirim ke penyedia AI pihak ketiga
            (saat ini Cloudflare Workers AI) hanya untuk diproses, lalu hasilnya dikembalikan ke browsermu. VektorAha
            tidak menyimpan foto atau hasilnya di server kami.
          </p>
          <p>Unggah hanya foto milikmu sendiri atau foto yang pemiliknya sudah mengizinkan.</p>
        </Section>

        <Section title="Analitik">
          <p>
            Kami memakai Google Analytics untuk mengetahui halaman dan fitur mana yang paling sering dipakai, misalnya
            jumlah foto yang diproses atau diunduh. Google Analytics memakai cookie dan tidak menerima foto kamu.
          </p>
        </Section>

        {ADSENSE_CLIENT && (
          <Section title="Iklan">
            <p>
              Situs ini menampilkan iklan dari Google AdSense. Google dan partnernya dapat memakai cookie untuk
              menampilkan iklan berdasarkan kunjunganmu ke situs ini dan situs lain.
            </p>
            <p>
              Kamu bisa mematikan iklan yang dipersonalisasi di{" "}
              <a className={linkClass} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                Setelan Iklan Google
              </a>
              . Pelajari lebih lanjut di{" "}
              <a
                className={linkClass}
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                cara Google memakai data dari situs partner
              </a>
              .
            </p>
          </Section>
        )}

        <Section title="Cookie">
          <p>
            Cookie dipakai oleh Google Analytics{ADSENSE_CLIENT ? " dan Google AdSense" : ""}. Kamu bisa menghapus
            atau memblokir cookie lewat pengaturan browser; fitur edit foto tetap bisa dipakai.
          </p>
        </Section>

        <Section title="Perubahan & kontak">
          <p>Kebijakan ini bisa diperbarui sewaktu-waktu. Tanggal pembaruan terakhir tertera di atas.</p>
          {CONTACT_EMAIL && (
            <p>
              Pertanyaan soal privasi bisa dikirim ke{" "}
              <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
        </Section>
      </article>
    </Container>
  );
}
