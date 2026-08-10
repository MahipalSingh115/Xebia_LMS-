import { FolderTree, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Programming",
    courses: 12,
  },
  {
    id: 2,
    name: "Cloud Computing",
    courses: 8,
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    courses: 15,
  },
];

export default function RecentCategories() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Categories</CardTitle>
        <Button variant="ghost">View All</Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#F0DAEA] p-3">
                <FolderTree className="text-[#6C1D5F]" size={20} />
              </div>

              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.courses} Courses
                </p>
              </div>
            </div>

            <ChevronRight size={18} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}