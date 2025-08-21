"use client";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
