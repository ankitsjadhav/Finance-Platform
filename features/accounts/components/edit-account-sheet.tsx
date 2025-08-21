"use client";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useConfirm } from "@/hooks/use-confirm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof formSchema>;

const MOCK_ACCOUNTS = [
  { id: "1", name: "Cash" },
  { id: "2", name: "Bank" },
];

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const account = accounts.find((a) => a.id === id);

  const defaultValues = account ? { name: account.name } : { name: "" };

  const onSubmit = (values: FormValues) => {
    setIsPending(true);
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name: values.name } : a))
    );
    setIsPending(false);
    onClose();
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsPending(true);
      setAccounts((prev) => prev.filter((a) => a.id !== id));
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center ">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
