import TheTable from "@/components/admin/TheTable";
import { AllUsersColumns } from "@/components/admin/columns";
import { getAllUsers } from "@/lib/admin/actions/user";
import React from "react";

const AllUsers = async () => {
  const AllUsers = await getAllUsers();

  return (
    <section className="admin-main p-7">
      <TheTable title="All Users" columns={AllUsersColumns} data={AllUsers} />
    </section>
  );
};

export default AllUsers;
