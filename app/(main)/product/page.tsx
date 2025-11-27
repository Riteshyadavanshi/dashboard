import { RedirectBtn } from "@/components/action-btn/RedirectBtn";
import { DataTable } from "@/components/DataTable";
import { ProductColumn } from "./_components/column";
import { getAllProductWithImagesAndCategoryStore } from "@/lib/helper";

const ProductPage = async () => {
  const products = await getAllProductWithImagesAndCategoryStore();
  return (
    <>
      <div className="w-full flex justify-between items-center bg-white   p-4 rounded-md shadow">
        <h1 className="text-indigo-900 font-bold text-xl">Product</h1>
        <RedirectBtn url="/product/new">Add</RedirectBtn>
      </div>
      {/* Product Table */}
      <div className="mt-4">
        <DataTable columns={ProductColumn} data={products} />
      </div>{" "}
    </>
  );
};

export default ProductPage;
