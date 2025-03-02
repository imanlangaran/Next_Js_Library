import { AccountRequestsColumns } from "@/components/admin/columns";
import TheTable from "@/components/admin/TheTable";
import { getAccountRequestData } from "@/lib/admin/actions/user";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const page = async () => {
  const AccountRequestData = await getAccountRequestData();

  return (
    <section className="admin-main p-7">
      <TheTable
      title="Account Registration Requests"
      data={AccountRequestData}
      columns={AccountRequestsColumns as ColumnDef<{
        id: string;
        email: string;
        fullName: string;
        joinedDate: string;
        universityIdNo: number;
        universityIdCard: string;
      }>[]
      }
      />
    </section>
  );
};

export default page;
