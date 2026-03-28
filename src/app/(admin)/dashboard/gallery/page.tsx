"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema, type GalleryInput } from "@/lib/validations";
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from "@/lib/actions/gallery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string | null;
  tags: string[];
  published: boolean;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GalleryInput>({
    resolver: zodResolver(gallerySchema),
  });

  async function loadImages() {
    const result = await getGalleryImages();
    if (result.success && result.data) setImages(result.data as GalleryImage[]);
  }

  useEffect(() => {
    loadImages();
  }, []);

  function openNew() {
    reset({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      tags: [],
      published: false,
    });
    setError("");
    setModalOpen(true);
  }

  const onSubmit = async (data: GalleryInput) => {
    setError("");
    const result = await createGalleryImage(data);
    if (result.success) {
      setModalOpen(false);
      loadImages();
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    loadImages();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      {images.length === 0 ? (
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">No images yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-lg border bg-white"
            >
              <div className="aspect-square">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium">{img.title}</p>
                {img.category && (
                  <Badge variant="outline" className="mt-1">
                    {img.category}
                  </Badge>
                )}
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Image"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <Input label="Title" {...register("title")} error={errors.title?.message} />
          <Input
            label="Image URL"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
          />
          <Input label="Description" {...register("description")} />
          <Input label="Category" placeholder="e.g. Campus, Events" {...register("category")} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("published")} />
            Published
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Image"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
