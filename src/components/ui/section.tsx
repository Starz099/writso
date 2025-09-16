import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
  background?: "default" | "muted" | "accent";
}

export function Section({
  children,
  className,
  size = "default",
  background = "default",
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        {
          "py-8": size === "sm",
          "py-16": size === "default",
          "py-24": size === "lg",
          "py-32": size === "xl",
        },
        {
          "bg-background": background === "default",
          "bg-muted/50": background === "muted",
          "bg-accent/50": background === "accent",
        },
        className,
      )}
    >
      {children}
    </section>
  );
}
