import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
import TaskTable from "./TaskTable";
import { TasksColumns } from "./TaskColumns";
// import TaskPagination from "./TaskPagination";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { resetState, setFilterByTask } from "@/store/features/taskSlice";
import TableSkeleton from "./TableSkeleton";

const SearchInput = () => {
  const { filterByTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  return (
    <Input
      type="text"
      className="h-10 max-w-sm"
      placeholder="Filter By Tasks..."
      value={filterByTask}
      onChange={(e) => dispatch(setFilterByTask(e.target.value))}
    />
  );
};

const TaskArea: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  return (
    <div className="px-7 mt-5">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 max-md:flex-wrap max-md:items-start">
            <SearchInput />

            <PriorityDropdown />

            <StatusDropdown />

            <Button
              variant="ghost"
              className="h-10"
              onClick={() => dispatch(resetState())}
            >
              <span>Reset</span> <IoCloseSharp />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!tasks ? (
            <TableSkeleton />
          ) : (
            <TaskTable columns={TasksColumns} data={tasks} />
          )}
        </CardContent>
        <CardFooter>{/* <TaskPagination /> */}</CardFooter>
      </Card>
    </div>
  );
};

export default TaskArea;
