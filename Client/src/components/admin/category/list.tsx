/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "../table";
import { createColumnHelper } from "@tanstack/react-table";
import ActionButtons from "../table/action-buttons";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../api/category.api";

const CategoryList = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllCategory,
    queryKey: ["get_all_category"],
  });

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Category Name</span>,
      cell: (info) => (
        <span className="w-full font-semibold text-start">
          {info.getValue()}
        </span>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
      id: "description",
      cell: (info) => (
        <div className="overflow-clip line-clamp-1 max-w-[250px]">
          {info.getValue() ?? "-"}
        </div>
      ),
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Created At</span>,
      cell: (info) => (
        <div>
          {new Date(info.renderValue()).toLocaleDateString("en-Us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      header: () => <span>Updated At</span>,
      cell: (info) => (
        <div>
          {new Date(info.renderValue()).toLocaleDateString("en-Us", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    }),

    columnHelper.accessor("actions", {
      header: () => <span>Actions</span>,
      cell: () => (
        <ActionButtons
          onDelete={() => {
            console.log("Category delete");
          }}
        />
      ),
    }),
  ];

  if (isLoading) {
    return (
      <div className="mt-5 font-black flex justify-center items-center">
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-1/2 w-full shadow  p-3 tracking-wider mt-10">
      <h1 className="text-2xl text-gray-800 font-bold mb-3 ">All Categories</h1>
      <Table columns={columns} data={data?.data ?? []} />
    </div>
  );
};

export default CategoryList;
