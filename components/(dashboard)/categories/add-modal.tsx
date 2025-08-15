"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { startTransition, useActionState, useRef } from "react";
import { createCategoryAction } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import ValidatedInput from "@/components/ui/validated-input";
import { categorySchema, CategoryInput } from "@/validations/products";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialState = { message: "", errors: {} };

export default function AddCategoryDialog({ open, onOpenChange }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    initialState
  );

  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "", description: "" },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg bg-white/90">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <ScrollArea className="-mr-4 w-full py-1 pr-4">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  const formData = new FormData(formRef.current!);
                  startTransition(async () => {
                    formAction(formData);
                    onOpenChange(false); // ✅ close only on success
                  });
                })(evt);
              }}
              id="category-form"
              className="space-y-4"
            >
              <ValidatedInput
                name="name"
                label="Name"
                placeholder="Category Name"
                form={form}
              />
              <ValidatedInput
                name="slug"
                label="Slug"
                placeholder="category-slug"
                form={form}
              />
              <ValidatedInput
                name="description"
                label="Description"
                placeholder="Short description"
                form={form}
              />
            </form>
          </Form>
        </ScrollArea>
        <div className="flex justify-center">
          {isPending ? (
            <Button type="button" className="w-[120px] bg-gray-500">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" form="category-form">
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
