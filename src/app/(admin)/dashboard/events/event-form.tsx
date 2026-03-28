"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventInput } from "@/lib/validations";
import { createEvent, updateEvent } from "@/lib/actions/events";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  initialData?: EventInput & { id: string };
}

export function EventForm({ initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          eventDate: new Date(initialData.eventDate as string | number | Date),
          endDate: initialData.endDate ? new Date(initialData.endDate as string | number | Date) : null,
        }
      : {
          title: "",
          slug: "",
          description: "",
          venue: "",
          eventDate: new Date(),
          endDate: null,
          image: "",
          published: false,
          featured: false,
        },
  });

  const onSubmit = async (data: EventInput) => {
    setError("");
    const result = isEdit
      ? await updateEvent(initialData!.id, data)
      : await createEvent(data);

    if (result.success) {
      router.push("/dashboard/events");
      router.refresh();
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  function toDateInputValue(date: Date | null | undefined) {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Title"
              {...register("title", {
                onChange: (e) => {
                  if (!isEdit) setValue("slug", slugify(e.target.value));
                },
              })}
              error={errors.title?.message}
            />
            <Input label="Slug" {...register("slug")} error={errors.slug?.message} />
          </div>

          <Input label="Venue" {...register("venue")} error={errors.venue?.message} />

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Event Date"
              type="datetime-local"
              {...register("eventDate")}
              error={errors.eventDate?.message}
            />
            <Input
              label="End Date (optional)"
              type="datetime-local"
              {...register("endDate")}
            />
          </div>

          <Input label="Image URL" {...register("image")} />

          <Textarea
            label="Description"
            rows={5}
            {...register("description")}
            error={errors.description?.message}
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("published")} />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featured")} />
              Featured
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Event" : "Create Event"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
