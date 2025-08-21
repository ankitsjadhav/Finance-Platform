"use client";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { CategoryForm } from "@/features/categories/components/category-form";
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

const MOCK_CATEGORIES = [
  { id: "1", name: "Food" },
  { id: "2", name: "Travel" },
];

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const category = categories.find((c) => c.id === id);

  const defaultValues: FormValues = category
    ? { name: category.name }
    : { name: "" };

  const onSubmit = (values: FormValues) => {
    if (!id) return;
    setIsPending(true);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...values } : c))
    );
    setIsPending(false);
    onClose();
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      setIsPending(true);
      setCategories((prev) => prev.filter((c) => c.id !== id));
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center ">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
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
