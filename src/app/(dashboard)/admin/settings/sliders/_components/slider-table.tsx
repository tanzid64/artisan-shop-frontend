"use client";
import { DataTable } from "@/components/data-table/data-table";
import { Pagination } from "@/components/data-table/pagination";
import { SortColumnHeader } from "@/components/data-table/sort-col-header";
import { useSlider } from "@/hooks/dashbaord/admin/use-slider";
import { ISliders } from "@/types/auth/dashboard/admin/sliders";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

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
        header: () => (
          <SortColumnHeader
            title="Serial"
            name="serial"
            filterData={filterData}
          />
        ),
        meta: { sortable: true },
      },
      { accessorKey: "status_name", header: "Status" },
      { accessorKey: "status", header: "Action" },
    ],
    [data?.current_page, data?.per_page, filterData]
  );

  return (
    <div>
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
