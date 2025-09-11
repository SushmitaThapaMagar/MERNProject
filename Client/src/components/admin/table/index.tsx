/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface IProps {
  data: any[];
  columns: any[];
}

const Table: React.FC<IProps> = ({ data = [], columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-0 w-full  min-h-full tracking-wider  rounded-t-lg overflow-hidden ">
      <table
        style={{ borderRadius: "10px" }}
        className="overflow-y-scroll w-full h-full rounded-md "
      >
        <thead className="bg-cyan-700 h-12 text-white font-bold ">
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr className="py-3" key={headerGroup.id}>
              {headerGroup?.headers?.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="px-2 overflow-auto">
          {table.getRowModel().rows?.map((row, index) => (
            <tr
              className={`hover:bg-blue-200 ${
                index % 2 === 1 ? "bg-blue-100" : ""
              }`}
              key={row.id}
            >
              {row.getVisibleCells()?.map((cell) => (
                <td className="text-center py-3" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
