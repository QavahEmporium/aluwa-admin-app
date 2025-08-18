import ProductAddForm from "@/components/(dashboard)/products/[id]/product-form";
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

  return <ProductAddForm categories={categoriesMap} product={emptyProduct} />;
}
