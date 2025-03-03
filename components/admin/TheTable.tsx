"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props<TData extends { id: string | number }, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange?: (updatedRow: TData) => void;
  extraButtons?: React.ReactNode;
}

const TheTable = <TData extends { id: string | number }, TValue>({
  title,
  columns,
  data: initialData,
  onDataChange,
  extraButtons,
}: Props<TData, TValue>) => {
  const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (updatedData: TData | TData[]) => {
        if (Array.isArray(updatedData)) {
          setData(updatedData);
        } else {
          setData((prev) =>
            prev.map((row) => (row.id === updatedData.id ? updatedData : row))
          );
        }
        // Propagate changes up if needed
        onDataChange?.(updatedData as TData);
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>{title}</h2>
        <div className="flex gap-2 items-center">
          <button className="btn-primary">A-Z</button>
          {extraButtons}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap text-center w-fit">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap w-fit"
                      style={{
                        textAlign: index === 0 ? 'left' : 'center'
                      }}>
                      <div className={`flex items-center ${index === 0 ? 'justify-start' : 'justify-center'}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TheTable;
