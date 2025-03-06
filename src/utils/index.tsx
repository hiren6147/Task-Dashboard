import { Task } from "@/data/tasksData";
import { FilterFn } from "@tanstack/react-table";

export const titleFilter: FilterFn<Task> = (row, _, filterValue) => {
  const title: string = row.getValue("title") || "";
  const query = String(filterValue).toLowerCase();
  return title.toLowerCase().includes(query);
};

export const priorityFilter: FilterFn<Task> = (row, columnId, filterValue) => {
  const priority: string = row.getValue(columnId);
  return filterValue.includes(priority);
};

export const statusFilter: FilterFn<Task> = (row, columnId, filterValue) => {
  const status: string = row.getValue(columnId);
  return filterValue.includes(status);
};
