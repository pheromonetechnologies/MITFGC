import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Gallery - MIT First Grade College",
  description:
    "Browse photos from campus life, events, sports, and cultural activities at MIT First Grade College, Mysuru.",
};

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  thumbnail: string | null;
  category: string | null;
}

const staticImages: GalleryItem[] = [
  {
    id: "1",
    title: "College Campus",
    description: "Main campus building of MIT First Grade College",
    imageUrl: "/images/gallery/campus-1.jpg",
    thumbnail: null,
    category: "Campus",
  },
  {
    id: "2",
    title: "Computer Lab",
    description: "State-of-the-art computer lab with 80+ systems",
    imageUrl: "/images/gallery/lab-1.jpg",
    thumbnail: null,
    category: "Campus",
  },
  {
    id: "3",
    title: "Library",
    description: "College library with 3000+ books",
    imageUrl: "/images/gallery/library-1.jpg",
    thumbnail: null,
    category: "Campus",
  },
  {
    id: "4",
    title: "Annual Day Celebrations",
    description: "Students performing during annual day celebrations",
    imageUrl: "/images/gallery/event-1.jpg",
    thumbnail: null,
    category: "Events",
  },
  {
    id: "5",
    title: "Sports Day",
    description: "Annual sports day competitions",
    imageUrl: "/images/gallery/sports-1.jpg",
    thumbnail: null,
    category: "Sports",
  },
  {
    id: "6",
    title: "Cultural Fest",
    description: "Cultural fest celebrations",
    imageUrl: "/images/gallery/cultural-1.jpg",
    thumbnail: null,
    category: "Cultural",
  },
];

async function getGalleryImages(): Promise<GalleryItem[] | null> {
  try {
    const images = await db.galleryImage.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        thumbnail: true,
        category: true,
      },
    });
    return images.length > 0 ? images : null;
  } catch {
    return null;
  }
}

export default async function GalleryPage() {
  const images = (await getGalleryImages()) ?? staticImages;
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category).filter(Boolean) as string[]))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              A visual journey through our campus life, events, and activities
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <GalleryGrid images={images} categories={categories} />
        </div>
      </section>
    </div>
  );
}
