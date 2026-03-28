"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noticeSchema, type NoticeInput } from "@/lib/validations";
import { createNotice, updateNotice } from "@/lib/actions/notices";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  initialData?: NoticeInput & { id: string };
}

export function NoticeForm({ initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoticeInput>({
    resolver: zodResolver(noticeSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      attachment: "",
      priority: "NORMAL",
      published: false,
      expiresAt: null,
    },
  });

  const onSubmit = async (data: NoticeInput) => {
    setError("");
    const result = isEdit
      ? await updateNotice(initialData!.id, data)
      : await createNotice(data);

    if (result.success) {
      router.push("/dashboard/notices");
      router.refresh();
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <Input label="Title" {...register("title")} error={errors.title?.message} />

          <Select
            label="Priority"
            options={[
              { value: "LOW", label: "Low" },
              { value: "NORMAL", label: "Normal" },
              { value: "HIGH", label: "High" },
              { value: "URGENT", label: "Urgent" },
            ]}
            {...register("priority")}
            error={errors.priority?.message}
          />

          <Textarea
            label="Content"
            rows={6}
            {...register("content")}
            error={errors.content?.message}
          />

          <Input label="Attachment URL" {...register("attachment")} />

          <Input
            label="Expires At (optional)"
            type="datetime-local"
            {...register("expiresAt")}
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("published")} />
            Published
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Notice" : "Create Notice"}
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
