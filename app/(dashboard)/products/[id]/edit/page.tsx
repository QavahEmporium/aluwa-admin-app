import OptionMenu from "@/components/(dashboard)/products/[id]/option-menu";
import ProductAddForm from "@/components/(dashboard)/products/[id]/product-form";
import { BackButton } from "@/components/ui/buttons";
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

  const product = await getProductById(id);
  const categories = await listCategories();
  const categoriesMap = categories.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <div className="mb-6">
          <BackButton name="Edit  Product" />
        </div>

        <OptionMenu
          productId={product.id}
          imageUrl={product.imageUrl}
          isPublished={product.isPublished}
        />
      </div>
      <ProductAddForm categories={categoriesMap} product={product} />
    </div>
  );
}
