import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpCircle, CheckCircle2, Circle, LucideIcon } from "lucide-react";
import { Task } from "@/data/tasksData";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { TaskFormData } from "./TaskFormSchema";

type Status = {
  value: Task["status"];
  icon: LucideIcon;
};

const statues: Status[] = [
  {
    value: "Todo",
    icon: Circle,
  },
  {
    value: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "Complete",
    icon: CheckCircle2,
  },
];

const TaskStatusSelect: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TaskFormData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">
        Status<span className="text-red-500">*</span>
      </Label>
      <Controller
        name="status"
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: TaskFormData["status"]) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statues?.map((status) => (
                    <SelectItem key={status?.value} value={status?.value}>
                      <div className="flex items-center gap-2">
                        <status.icon size={15} />
                        <span>{status?.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      />
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}
    </div>
  );
};

export default TaskStatusSelect;
