export type Status = "Todo" | "In Progress" | "Complete";
export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string | Date;
};

export const Tasks: Task[] = [
  // {
  //   id: "1",
  //   title: "Test",
  //   description: "Desc",
  //   status: "Todo",
  //   priority: "High",
  //   dueDate: new Date(
  //     "Fri Mar 10 2025 00:00:00 GMT+0530 (India Standard Time)"
  //   ).toISOString(),
  // },
  // {
  //   id: "2",
  //   title: "Bye",
  //   description: "Desc",
  //   status: "In Progress",
  //   priority: "Low",
  //   dueDate: new Date().toISOString(),
  // },
  // {
  //   id: "3",
  //   title: "Hello",
  //   description: "Desc",
  //   status: "Complete",
  //   priority: "High",
  //   dueDate: new Date().toISOString(),
  // },
];
