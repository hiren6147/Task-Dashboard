import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
  status: z.enum(["Todo", "In Progress", "Complete"], {
    required_error: "You must select one of status",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "You must select one of priority",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
});

// export type TaskFormData = z.infer<typeof taskFormSchema>;

export type TaskFormData = {
  id?: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Complete";
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
};
