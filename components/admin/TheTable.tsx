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
}

const TheTable = <TData extends { id: string | number }, TValue>({
  title,
  columns,
  data: initialData,
  onDataChange,
}: Props<TData, TValue>) => {
  const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (updatedRow: TData) => {
        setData((prev) =>
          prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
        // Propagate changes up if needed
        onDataChange?.(updatedRow);
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>{title}</h2>
        <button className="btn-primary">A-Z</button>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                    key={cell.id}
                    className="whitespace-nowrap text-center w-fit">
                      <div className="flex items-center justify-center">
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
              <TableCell colSpan={columns.length} className="text-center h-24">
                No results.
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TheTable;
