import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/utils/hook";
import {
  deleteTask,
  setOpenConfirmTaskModal,
} from "@/store/features/taskSlice";

const TaskConfirmDialog: React.FC = () => {
  const { openConfirmTaskModal, selectedTask } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedTask) {
        dispatch(deleteTask(selectedTask));
      }
      dispatch(setOpenConfirmTaskModal(false));
    }, 1000);
  };

  return (
    <Dialog
      open={openConfirmTaskModal}
      onOpenChange={() =>
        dispatch(setOpenConfirmTaskModal(!openConfirmTaskModal))
      }
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>

          <Separator className="mt-3" />
        </DialogHeader>

        <div className="my-3">
          <h3 className="text-lg">
            Are you sure want to delete this <b>{`${selectedTask?.title}`}</b>{" "}
            task?
          </h3>
        </div>

        <DialogFooter className="my-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="px-9">
              Close
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskConfirmDialog;
