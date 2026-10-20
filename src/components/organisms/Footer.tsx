import Link from "next/link";
import { Container, Logo } from "@/components/atoms";
import { NAV_LINKS } from "@/constants";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-card">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-ink-muted">
            Ubah foto jadi ilustrasi anime atau pasfoto studio profesional dalam hitungan detik.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold text-ink-soft hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link href="/kebijakan-privasi" className="text-sm font-semibold text-ink-soft hover:text-ink">
            Kebijakan Privasi
          </Link>
        </nav>
      </Container>
      <Container className="border-t border-line py-5 text-xs text-ink-muted">
        © VektorAha. Gaya anime di sini terinspirasi oleh karya-karya populer dan tidak
        berafiliasi dengan pemegang hak ciptanya.
      </Container>
    </footer>
  );
}
