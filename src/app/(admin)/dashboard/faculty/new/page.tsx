import { db } from "@/lib/db";
import { FacultyForm } from "../faculty-form";

export default async function NewFacultyPage() {
  const departments = await db.department.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add Faculty Member</h1>
      <FacultyForm departments={departments} />
    </div>
  );
}
