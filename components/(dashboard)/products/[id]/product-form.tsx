"use client";

import {
  createProductAction,
  togglePublishProductAction,
} from "@/actions/product";
import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import { BackButton, SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import Select from "@/components/ui/select-validated";
import Textarea from "@/components/ui/textarea-validated";
import { productInputFormData } from "@/constants/product";
import { ProductForm, productFormSchema } from "@/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "./confirm-action-modal";

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

  const router = useRouter();
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

  // ✅ Publish/Unpublish modal state
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);

  const handlePublishToggle = async (publish: boolean) => {
    await togglePublishProductAction(productId);
    router.refresh();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <div className="mb-6">
          <BackButton name={`${product.id ? "Edit" : "Add"} Product`} />
        </div>

        {/* ✅ Publish / Unpublish buttons */}
        {product.id && (
          <div className="flex items-center">
            {product.isPublished ? (
              <button
                onClick={() => setShowUnpublishModal(true)}
                className="px-3 py-1 border border-black rounded bg-yellow-500 text-white"
              >
                Unpublish
              </button>
            ) : (
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-3 py-1 border border-black rounded bg-green-600 text-white"
              >
                Publish
              </button>
            )}
          </div>
        )}
      </div>

      {/* ✅ Confirm Modals */}
      <ConfirmModal
        open={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={() => handlePublishToggle(true)}
        title="Publish Product"
        message="Are you sure you want to publish this product?"
      />
      <ConfirmModal
        open={showUnpublishModal}
        onClose={() => setShowUnpublishModal(false)}
        onConfirm={() => handlePublishToggle(false)}
        title="Unpublish Product"
        message="Are you sure you want to unpublish this product?"
      />

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
              if (product.imageUrl) {
                await deleteFileByNameAction(product.imageUrl);
              }
              formData.append("imageUrl", filename);
            } else {
              // ✅ Keep existing image if user didn’t upload a new one
              if (product.imageUrl) {
                formData.append("imageUrl", product.imageUrl);
              }
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
