import { StoreWithChildren } from "@/lib/type";
import {
  categoryData,
  dummyUsers,
  ordersData,
  productData,
  revenueData,
} from "@/lib/utils";
import { StatsCard } from "../../_dashboard-component/statsCard";
import { ChartBar } from "@/components/BarChart";

interface StoreDashboardProps {
  store: StoreWithChildren;
}
export const StoreDashboard = async ({ store }: StoreDashboardProps) => {
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
      value: store.category.length,
      icon: "📦",
    },
    {
      label: "Total Products",
      value: store.category.reduce(
        (acc, cat) => (acc += cat.products.length),
        0
      ),
      icon: "🛒",
    },
  ];
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-indigo-900 font-bold text-3xl">{store.name}</h1>
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
  );
};
