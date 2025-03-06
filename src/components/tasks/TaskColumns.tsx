import { Priority, Status, Task } from "@/data/tasksData";
import {
  ArrowUpCircle,
  ArrowUpDown,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";
import React from "react";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useAppDispatch } from "@/utils/hook";
import {
  setOpenConfirmTaskModal,
  setOpenEditTaskModal,
  setSelectedTask,
} from "@/store/features/taskSlice";

const renderStatusIcons = (status: Status) => {
  switch (status) {
    case "Todo":
      return Circle;
    case "In Progress":
      return ArrowUpCircle;
    case "Complete":
      return CheckCircle2;
    default:
      break;
  }
};

const renderPriorityIcons = (priority: Priority) => {
  switch (priority) {
    case "Low":
      return IoArrowDown;
    case "Medium":
      return IoArrowBack;
    case "High":
      return IoArrowUp;
    default:
      break;
  }
};

type SortableHeadersProps = {
  column: Column<Task, unknown>;
  label: string;
};

const SortableHeaders: React.FC<SortableHeadersProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted === "asc"
      ? IoMdArrowUp
      : isSorted === "desc"
      ? IoMdArrowDown
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Sort by ${label}`}
        >
          {label}
          <SortingIcon className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowUp className="mr-2 w-4 h-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowDown className="mr-2 w-4 h-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Row } from "@tanstack/react-table";

const TaskActions: React.FC<{ row: Row<Task> }> = ({ row }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          dispatch(setOpenEditTaskModal(true));
          dispatch(setSelectedTask(row.original));
        }}
      >
        <Pencil />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          dispatch(setOpenConfirmTaskModal(true));
          dispatch(setSelectedTask(row.original));
        }}
      >
        <Trash2 />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};

export const TasksColumns: ColumnDef<Task>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select All"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="ml-2">{Number(row.id) + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeaders column={column} label="Status" />,
    cell: ({ row }) => {
      const StatusIcon = renderStatusIcons(row.original.status);
      return (
        <div className="flex items-center gap-2">
          {StatusIcon && (
            <StatusIcon size={17} className="text-gray-600 opacity-95" />
          )}
          <span>{row.original.status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <SortableHeaders column={column} label="Priority" />
    ),
    cell: ({ row }) => {
      const PriorityIcon = renderPriorityIcons(row.original.priority);
      return (
        <div className="flex items-center gap-2">
          {PriorityIcon && (
            <PriorityIcon size={17} className="text-gray-600 opacity-95" />
          )}
          <span>{row.original.priority}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <SortableHeaders column={column} label="Due Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center ml-2">
          {format(row.original.dueDate, "PPP")}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <TaskActions row={row} />,
  },
];
