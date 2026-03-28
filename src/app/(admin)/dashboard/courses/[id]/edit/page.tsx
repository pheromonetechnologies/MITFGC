import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CourseForm } from "../../course-form";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [course, departments] = await Promise.all([
    db.course.findUnique({ where: { id } }),
    db.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!course) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Course</h1>
      <CourseForm
        departments={departments}
        initialData={{
          id: course.id,
          title: course.title,
          slug: course.slug,
          duration: course.duration,
          intake: course.intake,
          description: course.description,
          eligibility: course.eligibility,
          fees: course.fees,
          departmentId: course.departmentId,
          published: course.published,
          featured: course.featured,
        }}
      />
    </div>
  );
}
