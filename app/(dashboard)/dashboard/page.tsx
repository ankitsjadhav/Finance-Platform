"use client";

import { Suspense } from "react";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<div>Loading DataGrid...</div>}>
        <DataGrid />
      </Suspense>

      <Suspense fallback={<div>Loading DataCharts...</div>}>
        <DataCharts />
      </Suspense>
    </div>
  );
}

export default DashboardPage;
