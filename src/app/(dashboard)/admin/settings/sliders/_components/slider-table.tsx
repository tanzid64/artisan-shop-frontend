"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Pagination } from "@/components/data-table/pagination";
import { SortColumnHeader } from "@/components/data-table/sort-col-header";
import { Badge } from "@/components/ui/badge";
import { useSlider } from "@/hooks/dashbaord/admin/use-slider";
import { ISliders } from "@/types/auth/dashboard/admin/sliders";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { SliderFilter } from "./slider-filter";

export const SliderTable = () => {
  const { data, isLoading, filterData, setFilterData } = useSlider();

  const columns: ColumnDef<ISliders>[] = useMemo(
    () => [
      {
        header: "#",
        cell: ({ row }) => {
          const serial = row.index + 1;
          const page = data?.current_page ?? 1;
          const perPage = data?.per_page ?? 10;
          return <div>{serial + (page - 1) * perPage}</div>;
        },
        meta: { className: "text-center w-[5%]" },
      },
      {
        accessorKey: "type",
        header: () => (
          <SortColumnHeader title="Type" name="type" filterData={filterData} />
        ),
        meta: { sortable: true }, // mark column as sortable
      },
      {
        accessorKey: "title",
        header: () => (
          <SortColumnHeader
            title="Title"
            name="title"
            filterData={filterData}
          />
        ),
        meta: { sortable: true },
      },
      { accessorKey: "starting_price", header: "Starting Price" },
      {
        accessorKey: "serial",
        header: "Serial",
        meta: { className: "text-center w-[5%]" },
      },
      {
        accessorKey: "status_name",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={"outline"}>
            {row.original.status ? (
              <div className="size-2 bg-green-500 rounded-full" />
            ) : (
              <div className="size-2 bg-red-500 rounded-full" />
            )}
            {row.original.status_name}
          </Badge>
        ),
        meta: { className: "text-center" },
      },
      { accessorKey: "status", header: "Action" },
    ],
    [data?.current_page, data?.per_page, filterData]
  );

  return (
    <div>
      <SliderFilter setFilterData={setFilterData} />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isFetching={isLoading}
        onSortChange={(sort_by, sort_dir) =>
          setFilterData((prev) => ({ ...prev, sort_by, sort_dir }))
        }
      />
      <Pagination
        links={data?.links ?? []}
        onPageChange={(page: number) => {
          setFilterData((prev) => ({ ...prev, page }));
        }}
        currentPage={data?.current_page ?? 1}
        lastPage={data?.last_page ?? 1}
      />
    </div>
  );
};
