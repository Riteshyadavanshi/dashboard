import { getAllCategory, getProductById } from "@/lib/helper";
import { ProductWithImagesAndCategoryStoreType } from "@/lib/type";
import { ProductForm } from "./_component/ProductForm";

interface CreateOrUpdateProductProps {
  params: Promise<{
    productId: string;
  }>;
}

const CreateOrUpdateProduct = async ({
  params,
}: CreateOrUpdateProductProps) => {
  const { productId } = await params;
  let product: ProductWithImagesAndCategoryStoreType | null = null;

  if (productId !== "new") {
    product = await getProductById(productId);
  }
  const categories = await getAllCategory();

  return <ProductForm categories={categories} product={product} />;
};

export default CreateOrUpdateProduct;
