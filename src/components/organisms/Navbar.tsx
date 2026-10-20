"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink, Container, Logo } from "@/components/atoms";
import { NavLink } from "@/components/molecules";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all",
        scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/anime" size="sm" icon={<Sparkles className="size-4" />}>
            Coba gratis
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border-2 border-ink md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 animate-fade-up bg-paper md:hidden">
          <Container className="flex h-full flex-col gap-2 py-6">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} block onClick={close}>
                {l.label}
              </NavLink>
            ))}
            <ButtonLink href="/anime" size="lg" fullWidth onClick={close} className="mt-auto mb-6" icon={<Sparkles className="size-5" />}>
              Coba gratis
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
