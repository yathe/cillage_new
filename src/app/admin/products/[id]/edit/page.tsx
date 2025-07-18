import db from "@/db/db"
import { PageHeader } from "../../../_components/PageHeader"
import { ProductForm } from "../../_components/ProductForm"

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({ where: { id } })

return(
    <div className="flex justify-center items-center flex-col ">
    <PageHeader>Edit Product</PageHeader>
    <ProductForm product={product}/>
    </div>
  )
}