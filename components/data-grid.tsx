"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { DataCard, DataCardLoading } from "@/components/data-card";
import { formatDateRange } from "@/lib/utils";

export const DataGrid = () => {
  const MOCK_DATA = {
    remainingAmount: 32_000,
    remainingChange: 1.7,
    incomeAmount: 95_000,
    incomeChange: 5.4,
    expenseAmount: 63_000,
    expenseChange: -2.1,
  };

  const [data] = useState(MOCK_DATA);
  const [isLoading] = useState(false);

  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;

  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dataRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="default"
        dataRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data?.expenseAmount}
        percentageChange={data?.expenseChange}
        icon={FaArrowTrendDown}
        variant="default"
        dataRange={dateRangeLabel}
      />
    </div>
  );
};
