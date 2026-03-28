"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, type CourseInput } from "@/lib/validations";
import { createCourse, updateCourse } from "@/lib/actions/courses";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Department {
  id: string;
  name: string;
}

interface Props {
  departments: Department[];
  initialData?: CourseInput & { id: string };
}

export function CourseForm({ departments, initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      duration: "",
      intake: null,
      description: "",
      eligibility: "",
      fees: "",
      departmentId: "",
      published: false,
      featured: false,
    },
  });

  const onSubmit = async (data: CourseInput) => {
    setError("");
    const result = isEdit
      ? await updateCourse(initialData!.id, data)
      : await createCourse(data);

    if (result.success) {
      router.push("/dashboard/courses");
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
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
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
            <Input
              label="Slug"
              {...register("slug")}
              error={errors.slug?.message}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Input
              label="Duration"
              placeholder="e.g. 4 Years"
              {...register("duration")}
              error={errors.duration?.message}
            />
            <Input
              label="Intake"
              type="number"
              {...register("intake")}
              error={errors.intake?.message}
            />
            <Input
              label="Fees"
              {...register("fees")}
              error={errors.fees?.message}
            />
          </div>

          <Select
            label="Department"
            options={departments.map((d) => ({ value: d.id, label: d.name }))}
            placeholder="Select department"
            {...register("departmentId")}
            error={errors.departmentId?.message}
          />

          <Textarea
            label="Description"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />

          <Textarea
            label="Eligibility"
            rows={3}
            {...register("eligibility")}
            error={errors.eligibility?.message}
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
              {isSubmitting ? "Saving..." : isEdit ? "Update Course" : "Create Course"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
