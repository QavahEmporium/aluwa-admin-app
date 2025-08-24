import ProductAddForm from "@/components/(dashboard)/products/[id]/product-form";
import { BackButton } from "@/components/ui/buttons";
import { listCategories } from "@/data/category";
import { IProduct } from "@/definitions/product";

export default async function AddProductPage() {
  const categories = await listCategories();
  const categoriesMap = categories.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  // No fetch here since it's for adding a new product
  const emptyProduct: IProduct = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
    imageUrl: "",
  };

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <div className="mb-6">
          <BackButton name="Add Product" />
        </div>
      </div>
      <ProductAddForm categories={categoriesMap} product={emptyProduct} />
    </div>
  );
}
