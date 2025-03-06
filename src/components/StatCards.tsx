import React, { ReactNode } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTasks } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/utils/hook";

type StatCard = {
  id: number;
  title: string;
  value: number;
  icon: ReactNode;
};

const StatCard = ({ StatCard }: { StatCard: StatCard }) => {
  return (
    <Card className="p-4 flex flex-col shadow-none gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">
          {StatCard?.title}
        </span>
        <div className="size-7 rounded-md flex items-center justify-center text-sm bg-primary/25 font-bold text-primary">
          {StatCard?.icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{StatCard?.value}</div>
    </Card>
  );
};

const StatCards: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.task);

  const completeCount = tasks?.filter(
    (task) => task.status === "Complete"
  ).length;

  const highCount = tasks?.filter((task) => task.priority === "High").length;

  const statistics: StatCard[] = [
    {
      id: 1,
      title: "Total Tasks",
      value: tasks?.length ?? 0,
      icon: <FaTasks />,
    },
    {
      id: 2,
      title: "Completed Tasks",
      value: completeCount ?? 0,
      icon: <FaCheckCircle />,
    },
    {
      id: 3,
      title: "High Priority Tasks",
      value: highCount ?? 0,
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-2 mt-7 p-6 gap-6">
      {statistics?.map((card) => (
        <StatCard key={card?.id} StatCard={card} />
      ))}
    </div>
  );
};

export default StatCards;
