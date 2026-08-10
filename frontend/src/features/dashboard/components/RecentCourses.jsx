import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Java Basics",
    modules: 8,
    status: "Published",
  },
  {
    id: 2,
    title: "Spring Boot",
    modules: 12,
    status: "Draft",
  },
  {
    id: 3,
    title: "React Fundamentals",
    modules: 10,
    status: "Published",
  },
];

export default function RecentCourses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Courses</CardTitle>
        <Button variant="ghost">View All</Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-[#F0DAEA] p-3">
                <BookOpen className="text-[#6C1D5F]" size={20} />
              </div>

              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">
                  {course.modules} Modules
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {course.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}