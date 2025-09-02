"use client";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
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
  columns: ColumnDef<T>[]; // columns definitions
  data: T[]; // data array
  isFetching?: boolean; // loading state
  emptyMessage?: string; // message for empty table
  sortable?: boolean; // enable client-side sorting
  onSortChange?: (sortBy: string, sortDir: "asc" | "desc") => void; // server-side sort callback
}

export const DataTable = <T,>({
  columns,
  data,
  isFetching = false,
  emptyMessage = "No data found",
  sortable = false,
  onSortChange,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<T>[],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    manualSorting: !!onSortChange, // true if server-side sorting
    state: {
      sorting,
    },
    onSortingChange: (newSorting) => {
      // Handle Updater<SortingState> type
      const sortingState: SortingState =
        typeof newSorting === "function" ? newSorting([]) : newSorting;

      setSorting(sortingState);
      // Call server-side sort callback
      if (onSortChange && sortingState.length > 0) {
        const sortBy = sortingState[0].id;
        const sortDir = sortingState[0].desc ? "desc" : "asc";
        onSortChange(sortBy, sortDir);
      }
    },
  });

  return (
    <ScrollArea>
      <Table className="text-xs mb-3">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortableMeta = (
                  header.column.columnDef.meta as { sortable?: boolean }
                )?.sortable;

                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      (header.column.columnDef?.meta as { className?: string })
                        ?.className,
                      "border",
                      {
                        "cursor-pointer select-none": sortableMeta,
                      }
                    )}
                    onClick={() => {
                      if (sortableMeta) {
                        header.column.toggleSorting?.();
                      }
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isFetching ? (
            [...Array(15)].map((_, i) => (
              <TableRow key={i} className="border">
                <TableCell colSpan={columns.length} className="border">
                  <Skeleton className="h-6 w-full bg-muted" />
                </TableCell>
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
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
                      "border"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center border"
              >
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
