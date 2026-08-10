import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";
import categoryService from "@/features/categories/services/categoryService";

export default function RecentCategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecentCategories() {
      try {
        const data = await categoryService.getAllCategories();
        if (data) {
          // Display last 3 categories in reverse order
          setCategories(data.slice(-3).reverse());
        }
      } catch (err) {
        console.error("Failed to load recent categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecentCategories();
  }, []);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Recent Categories</CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Latest LMS categories
          </p>
        </div>

        <Button variant="ghost">
          View All
        </Button>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase text-slate-500">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-sm text-slate-500">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-sm text-slate-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 text-slate-500 text-sm max-w-[300px] truncate">
                    {item.description || "No description provided."}
                  </td>
                  <td className="px-6">
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}