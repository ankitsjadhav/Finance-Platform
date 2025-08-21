"use client";
export const dynamic = "force-dynamic";

import { toast } from "sonner";
import { useState } from "react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";

import { columns, ResponseType } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const [transactions, setTransactions] = useState<ResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isDisabled = isLoading || isDeleting;

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();

  const onSubmitImport = async (values: ResponseType[]) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    setTransactions((prev) => [...prev, ...data]);
    onCancelImport();
  };

  const handleAddTransaction = (newTransaction: ResponseType) => {
    setTransactions((prev) => [...prev, newTransaction]);
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto -mt-24 pb-10 w-full">
      <NewTransactionSheet onAdd={handleAddTransaction} />
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              size="sm"
              className="w-full lg:w-auto"
              onClick={newTransaction.onOpen}
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey={"payee"}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              setIsDeleting(true);
              setTransactions((prev) =>
                prev.filter((t) => !ids.includes(t.id))
              );
              setIsDeleting(false);
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
