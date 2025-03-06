import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./TaskFormSchema";

type TaskInputProps = {
  label: string;
  name: keyof TaskFormData;
};

const TaskInput: React.FC<TaskInputProps> = ({
  label,
  name,
}: TaskInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="opacity-75 text-sm font-medium">
        {label}
        <span className="text-red-500">*</span>
      </Label>
      <Input
        {...register(name)}
        type="text"
        className="h-11"
        placeholder={`Enter ${name}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TaskInput;
