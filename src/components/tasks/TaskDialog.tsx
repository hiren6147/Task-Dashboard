import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import TaskInput from "./forms/TaskInput";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { addNewTask, setOpenAddTaskModal } from "@/store/features/taskSlice";
import TaskStatusSelect from "./forms/TaskStatusSelect";
import { TaskFormData, taskFormSchema } from "./forms/TaskFormSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskPrioritySelect from "./forms/TaskPrioritySelect";
import TaskDatePicker from "./forms/TaskDatePicker";
import { v4 as uuidv4 } from "uuid";

const TaskDialog: React.FC = () => {
  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });
  const { handleSubmit } = methods;
  const { openAddTaskModal } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (data: TaskFormData) => {
    const formatDate = new Date(data?.dueDate).toISOString();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(
        addNewTask({
          ...data,
          dueDate: formatDate,
          id: uuidv4(),
        })
      );
      dispatch(setOpenAddTaskModal(false));
    }, 1000);
  };

  return (
    <Dialog
      open={openAddTaskModal}
      onOpenChange={() => dispatch(setOpenAddTaskModal(!openAddTaskModal))}
    >
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Fill in the form to add a task.</DialogDescription>
          <div className="mt-4">
            <Separator className="mt-3" />
          </div>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="my-4">
              <div className="grid grid-cols-2 max-md:grid-cols-1 items-start gap-4 mb-2">
                <TaskInput label="Title" name="title" />
                <TaskInput label="Description" name="description" />
              </div>
              <div className="grid grid-cols-2  max-md:grid-cols-1 items-start gap-4 mb-2">
                <TaskStatusSelect />
                <TaskPrioritySelect />
              </div>
              <div className="grid grid-cols-2  max-md:grid-cols-1 items-start gap-4 mb-2">
                <TaskDatePicker />
              </div>
            </div>

            <DialogFooter className="mb-4 mt-9">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="px-9">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
