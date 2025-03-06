import { Task } from "@/data/tasksData";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { titleFilter, priorityFilter, statusFilter } from "@/utils";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/utils/hook";

declare module "@tanstack/table-core" {
  interface FilterFns {
    titleFilter: FilterFn<Task>;
    priorityFilter: FilterFn<Task>;
    statusFilter: FilterFn<Task>;
  }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function TaskTable<TData extends Task, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { filterByTask, checkedPriorities, checkedStatues } = useAppSelector(
    (state) => state.task
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      sorting,
    },
    filterFns: {
      titleFilter,
      priorityFilter,
      statusFilter,
    },
  });

  useEffect(() => {
    const newFilter: ColumnFiltersState = [];
    if (filterByTask) {
      newFilter.push({
        id: "title",
        value: filterByTask,
      });
    }
    if (checkedPriorities) {
      newFilter.push({
        id: "priority",
        value: checkedPriorities,
      });
    }
    if (checkedStatues) {
      newFilter.push({
        id: "status",
        value: checkedStatues,
      });
    }
    setColumnFilters(newFilter);
  }, [filterByTask, checkedPriorities, checkedStatues]);
  return (
    <div className="rounded-md border mt-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TaskTable;
