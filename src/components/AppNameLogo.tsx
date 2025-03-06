import { ListTodo } from "lucide-react";
import React from "react";

const AppNameLogo: React.FC = () => {
  return (
    <header className="flex items-center gap-2 left-10 top-8">
      <div className="size-9 bg-primary rounded-md  flex items-center justify-center ">
        <ListTodo className="text-white text-xl" aria-hidden="true" />
      </div>
      <h1 className="font-semibold text-2xl max-md:hidden">
        Task <span className="font-normal text-primary">Dashboard</span>
      </h1>
    </header>
  );
};

export default AppNameLogo;
