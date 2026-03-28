import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { formatDate } from "@/lib/utils";

// Reserved slugs that have their own pages
const RESERVED_SLUGS = [
  "about",
  "programs",
  "faculty",
  "events",
  "gallery",
  "notices",
  "contact",
  "admission",
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string) {
  if (RESERVED_SLUGS.includes(slug)) return null;

  try {
    return await db.page.findUnique({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) return { title: "Page Not Found" };

  return {
    title: `${page.title} - MIT First Grade College`,
    description: page.description ?? `${page.title} - MIT First Grade College, Mysuru`,
  };
}

export default async function DynamicCMSPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl relative">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
            <p className="text-sm text-white/70">
              Last updated: {formatDate(page.updatedAt)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div
              className="prose prose-lg max-w-none text-foreground/80 prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
