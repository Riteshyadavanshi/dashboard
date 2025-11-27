import { getAllStores, getCategoryById } from "@/lib/helper";
import { CategoryWithProductAndStoreType } from "@/lib/type";
import { CategoryForm } from "./_component/CategoryForm";

interface CreateOrUpdateCategoryProps {
  params: Promise<{
    categoryId: string;
  }>;
}
const CreateOrUpdateCategory = async ({
  params,
}: CreateOrUpdateCategoryProps) => {
  const { categoryId } = await params;
  let category: CategoryWithProductAndStoreType | null = null;
  if (categoryId !== "new") {
    category = await getCategoryById(categoryId);
  }
  const stores = await getAllStores();
  return (
    <>
      <CategoryForm stores={stores} category={category} />
    </>
  );
};

export default CreateOrUpdateCategory;
