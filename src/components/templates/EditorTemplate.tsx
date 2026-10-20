import type { ReactNode } from "react";
import { Badge, Container, Heading, Text } from "@/components/atoms";

interface EditorTemplateProps {
  badge: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export function EditorTemplate({ badge, title, description, children }: EditorTemplateProps) {
  return (
    <Container className="py-8 sm:py-12">
      <header className="mb-8 max-w-2xl animate-fade-up space-y-3 sm:mb-10">
        <Badge tone="violet">{badge}</Badge>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
      </header>
      {children}
    </Container>
  );
}
