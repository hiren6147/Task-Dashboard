import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/data/tasksData";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { TaskFormData } from "./TaskFormSchema";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";

type Priority = {
  value: Task["priority"];
  icon: React.ElementType;
};

const statues: Priority[] = [
  {
    value: "Low",
    icon: IoArrowDown,
  },
  {
    value: "Medium",
    icon: IoArrowBack,
  },
  {
    value: "High",
    icon: IoArrowUp,
  },
];

const TaskPrioritySelect: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TaskFormData>();
  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">Priority</Label>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: TaskFormData["priority"]) =>
                field.onChange(value)
              }
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statues?.map((priority) => (
                    <SelectItem key={priority?.value} value={priority?.value}>
                      <div className="flex items-center gap-2">
                        <priority.icon size={15} />
                        <span>{priority?.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      />
      {errors.priority && (
        <p className="text-red-500 text-sm">{errors.priority.message}</p>
      )}
    </div>
  );
};

export default TaskPrioritySelect;
