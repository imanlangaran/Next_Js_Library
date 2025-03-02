import { AccountRequestsColumns } from "@/components/admin/columns";
import TheTable from "@/components/admin/TheTable";
import { getAccountRequestData } from "@/lib/admin/actions/user";
import React from "react";

const page = async () => {
  const AccountRequestData = await getAccountRequestData();

  return (
    <section className="admin-main p-7">
      <TheTable
        title="Account Registration Requests"
        data={AccountRequestData}
        columns={AccountRequestsColumns}
      />
    </section>
  );
};

export default page;
