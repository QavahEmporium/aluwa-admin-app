import ProductListPage from "@/components/(dashboard)/products/product-list";
import { listCategories } from "@/data/category";
import { listProducts } from "@/data/product";
import { Category, Product } from "@/definitions/product";
import { Suspense } from "react";

export default async function ProductsPage() {
  const products: Product[] = await listProducts();
  const categories: Category[] = await listCategories();

  const categoriesMap = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <Suspense fallback={<>Loading ...</>}>
      <ProductListPage cats={categoriesMap} prods={products} />
    </Suspense>
  );
}
