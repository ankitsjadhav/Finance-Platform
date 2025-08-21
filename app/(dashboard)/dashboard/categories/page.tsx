import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CategoriesClient } from "./categories-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  return (
    <div className="max-w-screen-2xl mx-auto -mt-24 pb-10 w-full">
      <Suspense fallback={<CategoriesPage.Skeleton />}>
        <CategoriesClient />
      </Suspense>
    </div>
  );
}

CategoriesPage.Skeleton = function CategoriesPageSkeleton() {
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
};
