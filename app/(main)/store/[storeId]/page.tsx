import { getStoreWithChildrenById } from "@/lib/helper";
import { StoreDashboard } from "../_components/StoreDashboard";
 

interface StoreDashBoardProps {
  params: Promise<{
    storeId: string;
  }>;
}
const StoreDashBoardPage = async ({ params }: StoreDashBoardProps) => {
  const storeId = (await params).storeId;
  const store = await getStoreWithChildrenById(storeId);
  if (!store) {
    return (
      <div className=" flex justify-center items-center">
        <h1 className="text-destructive">No Store available!</h1>
      </div>
    );
  }
  return <StoreDashboard store={store} />;
};

export default StoreDashBoardPage;
