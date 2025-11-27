import {
  BarChart,
  FastForward,
  HeadphoneOff,
  HomeIcon,
  MessageCircleReply,
  Telescope,
  User2,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { SidebarLink } from "./SidebarLink";
import { Divider } from "../Divider";
import { AddStoreDlg } from "../AddStoreDlg";
import { getAllStores } from "@/lib/helper";

const SidebarWrapper = async () => {
  const stores = await getAllStores();

  const dashBoardLink = [
    {
      icon: (
        <HomeIcon className="size-4  text-gray-400 hover:text-indigo-900 " />
      ),
      label: "Dashboard",
      url: "/",
    },
    {
      icon: (
        <BarChart className="size-4  text-gray-400 hover:text-indigo-900" />
      ),
      label: "Category",
      url: "/category",
    },
    {
      icon: (
        <MessageCircleReply className="size-4  text-gray-400 hover:text-indigo-900" />
      ),
      label: "Products",
      url: "/product",
    },
    {
      icon: <User2 className="size-4  text-gray-400 hover:text-indigo-900" />,
      label: "User",
      url: "/users",
    },
  ];

  const storeIcon = [
    {
      icon: (
        <FastForward className="size-4  text-gray-400 hover:text-indigo-900" />
      ),
    },

    {
      icon: (
        <HeadphoneOff className="size-4  text-gray-400 hover:text-indigo-900" />
      ),
    },

    {
      icon: (
        <Telescope className="size-4  text-gray-400 hover:text-indigo-900" />
      ),
    },
  ];
  return (
    <div className="bg-gray-100 h-full rounded-sm space-y-4 px-2">
      <div className="pt-2">
        <h1 className="text-xl text-center font-bold">ShopWave</h1>
      </div>
      <SearchBar />

      <div className="pl-4 space-y-4">
        <h1 className="text-gray-500  font-semibold">Menu</h1>

        <div className="pl-4 space-y-4">
          {dashBoardLink.map((link) => (
            <SidebarLink
              url={link.url}
              label={link.label}
              icon={link.icon}
              key={link.label}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="pl-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-500  font-semibold">Store</h1>
          <AddStoreDlg />
        </div>
        <div className="pl-4 space-y-4">
          {stores.map((store, i) => (
            <SidebarLink
              url={"/store/" + store.id}
              label={store.name}
              icon={storeIcon[i].icon}
              key={store.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
