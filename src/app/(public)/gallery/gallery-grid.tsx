"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  thumbnail: string | null;
  category: string | null;
}

interface GalleryGridProps {
  images: GalleryItem[];
  categories: string[];
}

export function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-semibold transition-colors",
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-muted text-foreground hover:bg-primary/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((image) => (
          <button
            key={image.id}
            onClick={() => setLightboxImage(image)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              src={image.thumbnail ?? image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div className="text-white text-left">
                <div className="font-semibold">{image.title}</div>
                {image.description && (
                  <div className="text-sm text-white/80">{image.description}</div>
                )}
              </div>
            </div>
            {/* Fallback when no image */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
              <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No images in this category yet.
        </p>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-bold">{lightboxImage.title}</h3>
              {lightboxImage.description && (
                <p className="text-white/70 mt-1">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
