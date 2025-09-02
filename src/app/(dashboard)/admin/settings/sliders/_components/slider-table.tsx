'use client';
import { DataTable } from "@/components/data-table/data-table";
import { useSlider } from "@/hooks/dashbaord/admin/use-slider";
import { ISliders } from "@/types/auth/dashboard/admin/sliders";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const SliderTable = () => {
  const { data, isLoading } = useSlider();
  const columns: ColumnDef<ISliders>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Title" },
    ],
    [data]
  );
  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isFetching={isLoading}
      />
    </div>
  );
};
