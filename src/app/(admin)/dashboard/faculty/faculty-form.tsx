"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultySchema, type FacultyInput } from "@/lib/validations";
import { createFaculty, updateFaculty } from "@/lib/actions/faculty";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  departments: { id: string; name: string }[];
  initialData?: FacultyInput & { id: string };
}

export function FacultyForm({ departments, initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FacultyInput>({
    resolver: zodResolver(facultySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      designation: "",
      email: "",
      phone: "",
      bio: "",
      qualifications: "",
      specialization: "",
      experience: "",
      departmentId: "",
      published: true,
    },
  });

  const onSubmit = async (data: FacultyInput) => {
    setError("");
    const result = isEdit
      ? await updateFaculty(initialData!.id, data)
      : await createFaculty(data);

    if (result.success) {
      router.push("/dashboard/faculty");
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
              label="Name"
              {...register("name", {
                onChange: (e) => {
                  if (!isEdit) setValue("slug", slugify(e.target.value));
                },
              })}
              error={errors.name?.message}
            />
            <Input
              label="Slug"
              {...register("slug")}
              error={errors.slug?.message}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Designation"
              placeholder="e.g. Associate Professor"
              {...register("designation")}
              error={errors.designation?.message}
            />
            <Select
              label="Department"
              options={departments.map((d) => ({ value: d.id, label: d.name }))}
              placeholder="Select department"
              {...register("departmentId")}
              error={errors.departmentId?.message}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Phone"
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Specialization"
              {...register("specialization")}
              error={errors.specialization?.message}
            />
            <Input
              label="Experience"
              placeholder="e.g. 10 Years"
              {...register("experience")}
              error={errors.experience?.message}
            />
          </div>

          <Textarea
            label="Qualifications"
            rows={3}
            {...register("qualifications")}
            error={errors.qualifications?.message}
          />

          <Textarea
            label="Bio"
            rows={4}
            {...register("bio")}
            error={errors.bio?.message}
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("published")} />
            Published
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update Faculty" : "Add Faculty"}
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
