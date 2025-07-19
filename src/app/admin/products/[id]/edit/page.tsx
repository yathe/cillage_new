import db from "@/db/db"
import { PageHeader } from "../../../_components/PageHeader"
import { ProductForm } from "../../_components/ProductForm"

export default async function EditProductPage(props: { params: { id: string } }) {
  const { id } = props.params; // ✅ Correct way to access params

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div className="text-red-500 text-center mt-4">Product not found.</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
