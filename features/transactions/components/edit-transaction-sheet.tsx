import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useConfirm } from "@/hooks/use-confirm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Transaction = {
  id: string;
  accountId: string;
  categoryId?: string | null;
  amount: string;
  date: string;
  payee: string;
  notes?: string | null;
};

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for demonstration
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    categoryId: "1",
    amount: "1000",
    date: new Date().toISOString(),
    payee: "John Doe",
    notes: "Sample note",
  },
];
const MOCK_ACCOUNTS = [
  { id: "1", name: "Cash" },
  { id: "2", name: "Bank" },
];
const MOCK_CATEGORIES = [
  { id: "1", name: "Food" },
  { id: "2", name: "Travel" },
];

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transaction = transactions.find((t) => t.id === id);

  const defaultValues: FormValues = transaction
    ? {
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        date: new Date(transaction.date),
        payee: transaction.payee,
        notes: transaction.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

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

  // Accepts amount as number (from TransactionForm), converts to string for state
  const handleFormSubmit = (
    data: Omit<FormValues, "amount"> & { amount: number }
  ) => {
    if (!id) return;

    setIsPending(true);

    const updatedTransaction: Transaction = {
      ...data,
      date: data.date.toISOString(),
      id,
      amount: data.amount.toString(),
    };

    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? updatedTransaction : t))
    );

    setIsPending(false);
    onClose();
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsPending(true);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      setIsPending(false);
      onClose();
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center ">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={handleFormSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
