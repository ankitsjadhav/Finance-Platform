import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ResponseType } from "@/app/(dashboard)/transactions/columns";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onAdd: (newTransaction: ResponseType) => void;
};

const MOCK_ACCOUNTS = [
  { id: "1", name: "Cash" },
  { id: "2", name: "Bank" },
];
const MOCK_CATEGORIES = [
  { id: "1", name: "Food" },
  { id: "2", name: "Travel" },
];

export const NewTransactionSheet = ({ onAdd }: Props) => {
  const { isOpen, onClose } = useNewTransaction();

  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const onCreateCategory = (name: string) => {
    const newCategory = { id: crypto.randomUUID(), name };
    setCategories((prev) => [...prev, newCategory]);
  };

  const onCreateAccount = (name: string) => {
    const newAccount = { id: crypto.randomUUID(), name };
    setAccounts((prev) => [...prev, newAccount]);
  };

  const handleFormSubmit = (
    data: Omit<FormValues, "amount"> & { amount: number }
  ) => {
    setIsPending(true);

    const categoryObj = categories.find((c) => c.id === data.categoryId);
    const accountObj = accounts.find((a) => a.id === data.accountId);

    const newTransaction: ResponseType = {
      id: crypto.randomUUID(),
      date: data.date instanceof Date ? data.date : new Date(data.date),
      category: categoryObj ? categoryObj.name : "",
      categoryId: data.categoryId ?? "",
      payee: data.payee,
      amount: data.amount,
      account: accountObj ? accountObj.name : "",
      accountId: data.accountId,
    };

    onAdd(newTransaction);
    setIsPending(false);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New transaction</SheetTitle>
          <SheetDescription>Create a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={handleFormSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
