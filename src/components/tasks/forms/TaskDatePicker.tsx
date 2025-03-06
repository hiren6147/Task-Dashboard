import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TaskFormData } from "./TaskFormSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const TaskDatePicker: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-2">
      <Label className="opacity-75 text-sm font-medium">
        Due Date<span className="text-red-500">*</span>
      </Label>
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-11 font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date(Date.now() - 864e5)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}
    </div>
  );
};

export default TaskDatePicker;
