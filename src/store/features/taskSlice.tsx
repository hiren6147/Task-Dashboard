import { Priority, Status, Task, Tasks } from "@/data/tasksData";
import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface TaskState {
  filterByTask: string;
  checkedPriorities: Priority[];
  checkedStatues: Status[];
  tasks: Task[] | null;
  selectedTask: Task | null;
  openAddTaskModal: boolean;
  openEditTaskModal: boolean;
  openConfirmTaskModal: boolean;
}

const initialState: TaskState = {
  filterByTask: "",
  checkedPriorities: [],
  checkedStatues: [],
  tasks: null,
  selectedTask: null,
  openAddTaskModal: false,
  openEditTaskModal: false,
  openConfirmTaskModal: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilterByTask: (state, action: PayloadAction<string>) => {
      state.filterByTask = action.payload;
    },
    setCheckedPriorities: (state, action: PayloadAction<Priority[]>) => {
      state.checkedPriorities = action.payload;
    },
    setCheckedStatues: (state, action: PayloadAction<Status[]>) => {
      state.checkedStatues = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[] | null>) => {
      state.tasks = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    addNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks?.push(action.payload);
      toast.success("Task is created successfully");
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.tasks?.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskIndex !== undefined && taskIndex !== -1 && state.tasks) {
        state.tasks[taskIndex] = action.payload;
      }
      toast.success("Task is updated successfully");
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      const filter = state.tasks?.filter(
        (task) => task.id !== action.payload.id
      );
      state.tasks = filter ?? null;
      toast.success("Task is deleted successfully");
    },
    setOpenAddTaskModal: (state, action: PayloadAction<boolean>) => {
      state.openAddTaskModal = action.payload;
    },
    setOpenEditTaskModal: (state, action: PayloadAction<boolean>) => {
      state.openEditTaskModal = action.payload;
    },
    setOpenConfirmTaskModal: (state, action: PayloadAction<boolean>) => {
      state.openConfirmTaskModal = action.payload;
    },
    resetState: (state) => {
      state.filterByTask = initialState.filterByTask;
      state.checkedPriorities = initialState.checkedPriorities;
      state.checkedStatues = initialState.checkedStatues;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilterByTask,
  setCheckedPriorities,
  setCheckedStatues,
  setTasks,
  setSelectedTask,
  setOpenAddTaskModal,
  setOpenEditTaskModal,
  setOpenConfirmTaskModal,
  addNewTask,
  updateTask,
  deleteTask,
  resetState,
} = taskSlice.actions;

export default taskSlice.reducer;

export const fetchTasks = () => async (dispatch: Dispatch) => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("Tasks loaded from local storage");
      return;
    }

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        dispatch(setTasks(Tasks));
        localStorage.setItem("tasks", JSON.stringify(Tasks));
        resolve();
      }, 1000);
    });
  } catch (error) {
    toast.error(`Failed to Fetch Data- ${error}`);
    dispatch(setTasks(null));
  }
};
