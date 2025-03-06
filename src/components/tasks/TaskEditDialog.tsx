import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import TaskInput from "./forms/TaskInput";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import { setOpenEditTaskModal, updateTask } from "@/store/features/taskSlice";
import TaskStatusSelect from "./forms/TaskStatusSelect";
import { TaskFormData, taskFormSchema } from "./forms/TaskFormSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskPrioritySelect from "./forms/TaskPrioritySelect";
import TaskDatePicker from "./forms/TaskDatePicker";

const TaskEditDialog: React.FC = () => {
  const { openEditTaskModal, selectedTask } = useAppSelector(
    (state) => state.task
  );

  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });
  const { handleSubmit } = methods;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (data: TaskFormData) => {
    const formatDate = new Date(data?.dueDate).toISOString();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(
        updateTask({ ...data, dueDate: formatDate, id: selectedTask?.id ?? "" })
      );
      dispatch(setOpenEditTaskModal(false));
    }, 1000);
  };

  useEffect(() => {
    methods.reset({
      ...selectedTask,
      dueDate: selectedTask?.dueDate
        ? new Date(selectedTask.dueDate)
        : undefined,
    });
  }, [selectedTask]);
  return (
    <Dialog
      open={openEditTaskModal}
      onOpenChange={() => dispatch(setOpenEditTaskModal(!openEditTaskModal))}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Fill in the form to edit a task.
          </DialogDescription>
          <div className="mt-4">
            <Separator className="mt-3" />
          </div>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="my-4">
              <div className="grid grid-cols-2  max-md:grid-cols-1 items-start gap-4 mb-2">
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

export default TaskEditDialog;
