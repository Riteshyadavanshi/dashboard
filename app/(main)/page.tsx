import {
  getAllCategory,
  getAllProductWithImagesAndCategoryStore,
  getAllStores,
} from "@/lib/helper";
import { StatsCard } from "./_dashboard-component/statsCard";
import {
  categoryData,
  dummyUsers,
  ordersData,
  productData,
  revenueData,
} from "@/lib/utils";
import { ChartBar } from "../../components/BarChart";
import { LogoutBtn } from "@/components/action-btn/LogoutBtn";

const DashboardPage = async () => {
  const categories = await getAllCategory();
  const products = await getAllProductWithImagesAndCategoryStore();
  const stores = await getAllStores();
  const stats = [
    {
      label: "Total Revenue",
      value: 25000,
      icon: "💰",
    },
    {
      label: "Total Users",
      value: dummyUsers.length,
      icon: "👥",
    },
    {
      label: "Total Categories",
      value: categories.length,
      icon: "📦",
    },
    {
      label: "Total Products",
      value: products.length,
      icon: "🛒",
    },
    {
      label: "Total Stores",
      value: stores.length,
      icon: "🏬",
    },
  ];

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-indigo-900 font-bold text-3xl">Dashboard</h1>
          <LogoutBtn />
        </div>

        <div className="flex items-center gap-x-2   ">
          {/* Stats Cards can be added here in future */}
          {stats.map((stat) => (
            <StatsCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ChartBar data={revenueData} title="Revenue" />
          <ChartBar data={ordersData} color="--chart-2" title="Order" />
          <ChartBar data={productData} color="--chart-3" title="Product" />
          <ChartBar data={categoryData} color="--chart-4" title="Category" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
