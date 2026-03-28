import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FacultyGrid } from "@/components/faculty/FacultyGrid";

export const metadata: Metadata = {
  title: "Faculty - MIT First Grade College",
  description: "Meet our experienced and dedicated faculty members at MIT First Grade College, Mysuru.",
};

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  qualifications: string | null;
  specialization: string | null;
  image: string | null;
  department: { name: string; slug: string };
}

interface GroupedFaculty {
  department: string;
  departmentSlug: string;
  members: FacultyMember[];
}

const staticFaculty: GroupedFaculty[] = [
  {
    department: "Computer Science",
    departmentSlug: "computer-science",
    members: [
      { id: "1", name: "Prof. Raju H.K.", slug: "raju-hk", designation: "HOD & Assistant Professor", qualifications: "MCA, M.Phil, (Ph.D)", specialization: "Computer Science", image: null, department: { name: "Computer Science", slug: "computer-science" } },
      { id: "2", name: "Prof. Shilpa M.", slug: "shilpa-m", designation: "Assistant Professor", qualifications: "MCA, M.Phil", specialization: "Software Engineering", image: null, department: { name: "Computer Science", slug: "computer-science" } },
      { id: "3", name: "Prof. Lavanya B.S.", slug: "lavanya-bs", designation: "Assistant Professor", qualifications: "MCA", specialization: "Database Systems", image: null, department: { name: "Computer Science", slug: "computer-science" } },
    ],
  },
  {
    department: "Commerce",
    departmentSlug: "commerce",
    members: [
      { id: "4", name: "Prof. Shivakumar K.B.", slug: "shivakumar-kb", designation: "HOD & Associate Professor", qualifications: "M.COM, Ph.D, NET, KSET", specialization: "Accounting & Finance", image: null, department: { name: "Commerce", slug: "commerce" } },
      { id: "5", name: "Prof. Mamatha H.S.", slug: "mamatha-hs", designation: "Assistant Professor", qualifications: "M.COM, NET", specialization: "Taxation", image: null, department: { name: "Commerce", slug: "commerce" } },
      { id: "6", name: "Prof. Pushpa H.N.", slug: "pushpa-hn", designation: "Assistant Professor", qualifications: "M.COM, KSET", specialization: "Financial Management", image: null, department: { name: "Commerce", slug: "commerce" } },
    ],
  },
  {
    department: "Management",
    departmentSlug: "management",
    members: [
      { id: "7", name: "Prof. Raghavendra D.", slug: "raghavendra-d", designation: "HOD & Assistant Professor", qualifications: "MBA, NET, (Ph.D)", specialization: "Marketing & HR", image: null, department: { name: "Management", slug: "management" } },
      { id: "8", name: "Prof. Preethi M.", slug: "preethi-m", designation: "Assistant Professor", qualifications: "MBA, NET", specialization: "Finance", image: null, department: { name: "Management", slug: "management" } },
    ],
  },
];

async function getFaculty(): Promise<GroupedFaculty[] | null> {
  try {
    const faculty = await db.faculty.findMany({
      where: { published: true },
      include: { department: true },
      orderBy: [{ department: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    });
    if (faculty.length === 0) return null;
    const grouped: Record<string, GroupedFaculty> = {};
    for (const f of faculty) {
      const deptName = f.department.name;
      if (!grouped[deptName]) {
        grouped[deptName] = { department: deptName, departmentSlug: f.department.slug, members: [] };
      }
      grouped[deptName].members.push({
        id: f.id, name: f.name, slug: f.slug, designation: f.designation,
        qualifications: f.qualifications, specialization: f.specialization, image: f.image,
        department: { name: f.department.name, slug: f.department.slug },
      });
    }
    return Object.values(grouped);
  } catch {
    return null;
  }
}

export default async function FacultyPage() {
  const grouped = (await getFaculty()) ?? staticFaculty;

  const totalFaculty = grouped.reduce((sum, g) => sum + g.members.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#001a3a] text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/15">
              <span className="text-sm font-medium">{totalFaculty}+ Expert Faculty Members</span>
            </div>
            <h1 className="text-display mb-6">Our Faculty</h1>
            <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              Meet our experienced and dedicated educators committed to shaping the future of our students
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Faculty Grid with Client-side Tabs */}
      <section className="py-20 px-6 -mt-12">
        <div className="container mx-auto max-w-6xl">
          <FacultyGrid groups={grouped} />
        </div>
      </section>
    </div>
  );
}
