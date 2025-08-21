import { Suspense } from "react";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { DataCardLoading } from "@/components/data-card";
import { ChartLoading } from "@/components/chart";
import { SpendingPieLoading } from "@/components/spending-pie"; // Assuming this path

// The main page is now a Server Component.
export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<DataGridSkeleton />}>
        <DataGrid />
      </Suspense>
      <Suspense fallback={<DataChartsSkeleton />}>
        <DataCharts />
      </Suspense>
    </div>
  );
}

// Skeleton for the DataGrid, matching your loading state.
const DataGridSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
    <DataCardLoading />
    <DataCardLoading />
    <DataCardLoading />
  </div>
);

// Skeleton for the DataCharts, matching your loading state.
const DataChartsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
    <div className="col-span-1 lg:col-span-3 xl:col-span-4">
      <ChartLoading />
    </div>
    <div className="col-span-1 lg:col-span-3 xl:col-span-2">
      <SpendingPieLoading />
    </div>
  </div>
);
