"use client";
export const dynamic = "force-dynamic";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { Loader2, Plus } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

const MOCK_CATEGORIES = [
  { id: "1", name: "Food" },
  { id: "2", name: "Travel" },
];

const CategoriesPage = () => {
  const newCategory = useNewCategory();

  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = (rows: any[]) => {
    setIsPending(true);
    const ids = rows.map((r) => r.original.id);
    setCategories((prev) => prev.filter((cat) => !ids.includes(cat.id)));
    setIsPending(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto -mt-24 pb-10 w-full">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto -mt-24 pb-10 w-full">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey={"name"}
            onDelete={handleDelete}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
