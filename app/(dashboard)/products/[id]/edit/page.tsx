import ProductAddForm from "@/components/(dashboard)/products/[id]/product-form";
import { listCategories } from "@/data/category";
import { getProductById, listProducts } from "@/data/product";

export async function generateStaticParams() {
  const products = await listProducts();

  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const prod = await getProductById(id);
  const categories = await listCategories();
  const categoriesMap = categories.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  return <ProductAddForm categories={categoriesMap} product={prod} />;
}
