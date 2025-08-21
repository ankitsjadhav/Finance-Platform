"use client";

import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

export function DashboardClient() {
  return (
    <>
      <DataGrid />
      <DataCharts />
    </>
  );
}
