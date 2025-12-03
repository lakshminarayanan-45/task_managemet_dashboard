export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type UserRole = "admin" | "manager" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User;
  createdBy: User;
  createdAt: string;
  dueDate: string;
  tags: string[];
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "task" | "comment" | "mention" | "deadline";
  read: boolean;
  createdAt: string;
  taskId?: string;
}
