"use client";

import { createProductAction } from "@/actions/product";
import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import { SubmitButton } from "@/components/ui/Buttons";
import InputValidated from "@/components/ui/input-validated";
import Select from "@/components/ui/select-validated";
import Textarea from "@/components/ui/textarea-validated";
import { productInputFormData } from "@/constants/product";
import { ProductForm, productFormSchema } from "@/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const ProductAddForm = ({
  product,
  categories,
}: {
  product: any;
  categories: any[];
}) => {
  const initialState = {
    message: "",
    errors: {},
  };

  const productId = product.id ? product.id : "";
  const createProductActionWithId = createProductAction.bind(null, productId);
  const [state, formAction, isPending] = useActionState(
    createProductActionWithId,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...product,
      price: product.price + "",
      stock: product.stock + "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        {product.id ? "Edit" : "Add"} Product
      </h1>

      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(async () => {
            const formData = new FormData(formRef.current!);

            const fileInput = document.querySelector<HTMLInputElement>(
              'input[name="imageFile"]'
            );
            let filename: string | undefined = "";

            if (fileInput?.files?.[0]) {
              const formData = new FormData();
              formData.append("file", fileInput.files[0]);
              const res = await uploadFile(formData); // Server Action
              if (res.success) filename = res.filename || "";
            }

            if (filename) {
              if (product.imageUrl)
                await deleteFileByNameAction(product.imageUrl);
              formData.append("imageUrl", filename);
            }
            startTransition(() => {
              formAction(formData);
            });
          })(evt);
        }}
        className="flex flex-col gap-4"
      >
        {productInputFormData.map((data) => (
          <InputValidated
            key={data.name}
            {...data}
            register={register}
            errors={errors}
            isPending={isPending}
            stateError={state?.errors}
          />
        ))}
        <Select
          label="Category"
          name="categoryId"
          register={register}
          errors={errors}
          options={categories}
        />

        <Textarea
          label="Description"
          name="description"
          register={register}
          errors={errors}
        />

        <div>
          <label className="block mb-1">Upload Image</label>
          {product.id && (
            <Image
              src={`/api/files/${product.imageUrl}`}
              alt={product.name}
              width={60}
              height={60}
              className="rounded border border-black mb-1"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="border border-black px-3 py-2 rounded w-full"
          />
        </div>
        <SubmitButton name={`${product.id ? "Edit" : "Add"} Product`} />
      </form>
    </div>
  );
};

export default ProductAddForm;
