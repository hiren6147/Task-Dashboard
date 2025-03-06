import React from "react";
import { useTheme } from "./theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import AppNameLogo from "./AppNameLogo";
import TaskDialog from "./tasks/TaskDialog";

const Navbar: React.FC = () => {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-black border-t" : "bg-white";
  return (
    <div
      className={`relative w-full h-[92px] overflow-hidden flex justify-between items-center px-6 border-b ${bgColor}`}
    >
      <AppNameLogo />
      <div className="flex items-center justify-center gap-3">
        <TaskDialog />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
