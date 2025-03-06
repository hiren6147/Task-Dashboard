import Navbar from "@/components/Navbar";
import StatCards from "@/components/StatCards";
import TaskArea from "@/components/tasks/TaskArea";
import TaskEditDialog from "@/components/tasks/TaskEditDialog";
import { useTheme } from "@/components/theme-provider";
import { fetchTasks } from "@/store/features/taskSlice";
import { useAppDispatch } from "@/utils/hook";
import React, { useEffect } from "react";

const Homepage: React.FC = () => {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-black" : "bg-slate-50";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Navbar />
      <StatCards />
      <TaskArea />
      <TaskEditDialog />
    </div>
  );
};

export default Homepage;
