import Categories from "@/components/(dashboard)/categories/categories";
import { listCategories } from "@/data/category";

export default async function CategoriesPage() {
  const cats = await listCategories();

  return <Categories cats={cats} />;
}
