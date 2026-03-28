import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({ badge, title, subtitle, className, light }: SectionHeaderProps) {
  return (
    <ScrollReveal className={`text-center mb-12 md:mb-16 ${className || ""}`}>
      {badge && (
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${light ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
          {badge}
        </span>
      )}
      <h2 className={`text-headline mb-4 font-serif ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-body-large max-w-2xl mx-auto ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
