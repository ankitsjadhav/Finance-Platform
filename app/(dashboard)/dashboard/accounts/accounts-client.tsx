"use client";

import { useState } from "react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export function AccountsClient() {
  const newAccount = useNewAccount();
  const [accounts, setAccounts] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isDisabled = isLoading || isDeleting;

  if (isLoading) {
    return (
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
    );
  }

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Account Page</CardTitle>
        <Button size="sm" onClick={newAccount.onOpen}>
          <Plus className="size-4 mr-2" />
          Add new
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={accounts}
          filterKey={"name"}
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            setIsDeleting(true);
            setAccounts((prev) => prev.filter((a) => !ids.includes(a.id)));
            setIsDeleting(false);
          }}
          disabled={isDisabled}
        />
      </CardContent>
    </Card>
  );
}
