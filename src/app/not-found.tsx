import { ButtonLink, Container, Heading, Text } from "@/components/atoms";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-5 py-24 text-center">
      <span className="font-display text-7xl font-extrabold text-accent">404</span>
      <Heading>Halaman tidak ditemukan</Heading>
      <Text>Mungkin tautannya salah ketik. Yuk balik ke beranda.</Text>
      <ButtonLink href="/">Ke beranda</ButtonLink>
    </Container>
  );
}
