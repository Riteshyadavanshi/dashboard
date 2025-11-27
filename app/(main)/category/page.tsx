import { RedirectBtn } from "@/components/action-btn/RedirectBtn";
import { DataTable } from "@/components/DataTable";
import { getAllCategoryWithProductStore } from "@/lib/helper";
import { CategoryColumn } from "./_components/column";

const CategoryPage = async () => {
  
  // Fetching catergory with it image and store
  const categories = await getAllCategoryWithProductStore();

  return (
    <>
      <div className="w-full flex justify-between items-center bg-white   p-4 rounded-md shadow">
        <h1 className="text-indigo-900 font-bold text-xl">Category</h1>
        <RedirectBtn url="/category/new">Add</RedirectBtn>
      </div>

      {/* Category Table */}
      <div className="mt-4">
        <DataTable columns={CategoryColumn} data={categories} />
      </div>{" "}
    </>
  );
};

export default CategoryPage;
