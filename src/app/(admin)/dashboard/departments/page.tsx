"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentSchema, type DepartmentInput } from "@/lib/validations";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/actions/departments";
import { slugify } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hod: string | null;
  phone: string | null;
  email: string | null;
  published: boolean;
  _count: { courses: number; faculty: number };
}

export default function DepartmentsPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
  });

  async function loadDepartments() {
    const result = await getDepartments();
    if (result.success && result.data) setDepartments(result.data as Department[]);
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  function openNew() {
    setEditing(null);
    reset({ name: "", slug: "", description: "", hod: "", phone: "", email: "", published: true });
    setError("");
    setModalOpen(true);
  }

  function openEdit(dept: Department) {
    setEditing(dept);
    reset({
      name: dept.name,
      slug: dept.slug,
      description: dept.description || "",
      hod: dept.hod || "",
      phone: dept.phone || "",
      email: dept.email || "",
      published: dept.published,
    });
    setError("");
    setModalOpen(true);
  }

  const onSubmit = async (data: DepartmentInput) => {
    setError("");
    const result = editing
      ? await updateDepartment(editing.id, data)
      : await createDepartment(data);

    if (result.success) {
      setModalOpen(false);
      loadDepartments();
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  async function handleDelete(id: string) {
    if (!confirm("Delete this department?")) return;
    const result = await deleteDepartment(id);
    if (result.success) loadDepartments();
    else alert(result.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardContent>
          {departments.length === 0 ? (
            <p className="text-sm text-gray-500">No departments found.</p>
          ) : (
            <div className="divide-y">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-gray-500">
                      {dept._count.courses} courses, {dept._count.faculty} faculty
                      {dept.hod && ` | HOD: ${dept.hod}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={dept.published ? "success" : "warning"}>
                      {dept.published ? "Published" : "Draft"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(dept)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Department" : "Add Department"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <Input
            label="Name"
            {...register("name", {
              onChange: (e) => {
                if (!editing) setValue("slug", slugify(e.target.value));
              },
            })}
            error={errors.name?.message}
          />
          <Input label="Slug" {...register("slug")} error={errors.slug?.message} />
          <Input label="HOD" {...register("hod")} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Phone" {...register("phone")} />
            <Input label="Email" type="email" {...register("email")} />
          </div>
          <Input label="Description" {...register("description")} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("published")} />
            Published
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editing ? "Update" : "Create"}
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
