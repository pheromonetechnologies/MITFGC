import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { FacultyForm } from "../../faculty-form";

export default async function EditFacultyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [member, departments] = await Promise.all([
    db.faculty.findUnique({ where: { id } }),
    db.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!member) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Faculty Member</h1>
      <FacultyForm
        departments={departments}
        initialData={{
          id: member.id,
          name: member.name,
          slug: member.slug,
          designation: member.designation,
          email: member.email,
          phone: member.phone,
          bio: member.bio,
          qualifications: member.qualifications,
          specialization: member.specialization,
          experience: member.experience,
          departmentId: member.departmentId,
          published: member.published,
        }}
      />
    </div>
  );
}
