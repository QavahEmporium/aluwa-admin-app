import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    isPublished: boolean;
    imageUrl: string;
  };
  setDeleteId: (id: string) => void;
  setImageUrl: (id: string) => void;
};

const TableRow = ({ product, setDeleteId, setImageUrl }: ProductCardProps) => {
  return (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <Image
          src={`/api/files/${product.imageUrl}`}
          alt={product.name}
          width={50}
          height={50}
          className="rounded-md border border-gray-200"
        />
      </td>
      <td className="px-4 py-3 font-medium">{product.name}</td>
      <td className="px-4 py-3">{product.category}</td>
      <td className="px-4 py-3">${product.price.toFixed(2)}</td>
      <td className="px-4 py-3">{product.stock}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-0.5 text-xs rounded-full ${
            product.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {product.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="py-3">
        <div className="inline-flex gap-2">
          <Link
            href={`/products/${product.id}/edit`}
            className="px-3 py-1 rounded-md border border-gray-300 text-xs hover:bg-gray-100"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              setDeleteId(product.id);
              setImageUrl(product.imageUrl);
            }}
            className="px-3 py-1 rounded-md border border-red-300 text-xs text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
