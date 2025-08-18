import ProductListPage from "@/components/(dashboard)/products/product-list";
import { listCategories } from "@/data/category";
import { listProducts } from "@/data/product";

export default async function ProductsPage() {
  const products = await listProducts();
  const categories = await listCategories();
  const categoriesMap = categories.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  return <ProductListPage cats={categoriesMap} prods={products} />;
}
