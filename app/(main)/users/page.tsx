import { DataTable } from "@/components/DataTable";
import React from "react";
import { UserColumn } from "./_components/column";
import { dummyUsers } from "@/lib/utils";

const Users = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center bg-white   p-4 rounded-md shadow">
        <h1 className="text-indigo-900 font-bold text-xl">All Users</h1>
      </div>
      {/* Product Table */}
      <div className="mt-4">
        <DataTable columns={UserColumn} data={dummyUsers} searchKey="email" />
      </div>{" "}
    </>
  );
};

export default Users;
