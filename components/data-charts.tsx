"use client";

import { useState } from "react";
import { Chart, ChartLoading } from "@/components/chart";
import { SpendingPie, SpendingPieLoading } from "./spending-pie";

const MOCK_DATA = {
  days: [
    { date: "2024-07-01", income: 30_000, expense: 18_000 },
    { date: "2024-07-02", income: 25_000, expense: 15_000 },
    { date: "2024-07-03", income: 20_000, expense: 14_000 },
    { date: "2024-07-04", income: 20_000, expense: 16_000 },
  ],
  categories: [
    { name: "Salary", value: 40_000 },
    { name: "Freelance", value: 25_000 },
    { name: "Rent", value: 18_000 },
    { name: "Groceries", value: 12_000 },
  ],
};

export const DataCharts = () => {
  const [data] = useState(MOCK_DATA);
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="grid grid-col-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data.categories} />
      </div>
    </div>
  );
};
