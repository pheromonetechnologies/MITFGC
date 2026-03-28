import { db } from "@/lib/db";
import { CourseForm } from "../course-form";

export default async function NewCoursePage() {
  const departments = await db.department.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Course</h1>
      <CourseForm departments={departments} />
    </div>
  );
}
