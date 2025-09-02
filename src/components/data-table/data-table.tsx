"use client";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isFetching?: boolean;
  emptyMessage?: string;
}
export const DataTable = <T,>({
  columns,
  data,
  isFetching = false,
  emptyMessage = "No data found",
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<T>[],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return (
    <ScrollArea>
      <Table className="text-xs mb-3">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-slate-500">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    (header.column.columnDef?.meta as { className?: string })
                      ?.className,
                    "text-white",
                    {
                      "w-[3%] text-center whitespace-nowrap":
                        header.column.id === "Sl/No",
                    }
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isFetching ? (
            [...Array(15)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="h-6 w-full bg-muted" />
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map((row, idx) => (
              <TableRow
                key={row.id}
                className={cn({
                  "bg-muted": idx % 2 !== 0,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      (cell.column.columnDef?.meta as { className?: string })
                        ?.className,
                      {
                        "w-[3%] text-center whitespace-nowrap":
                          cell.column.id === "Sl/No" ||
                          cell.column.id === "SL/No",
                      }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
