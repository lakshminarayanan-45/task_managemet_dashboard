import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task, Notification, User, TaskStatus } from "@/types/task";
import { tasks as initialTasks, notifications as initialNotifications, currentUser } from "@/data/mockData";

interface TaskContextType {
  tasks: Task[];
  notifications: Notification[];
  currentUser: User;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  canEditTask: (task: Task) => boolean;
  canDeleteTask: (task: Task) => boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Permission logic based on roles
  const canEditTask = (task: Task): boolean => {
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "manager") return true;
    if (currentUser.role === "employee") {
      return task.assignee.id === currentUser.id;
    }
    return false;
  };

  const canDeleteTask = (task: Task): boolean => {
    if (currentUser.role === "admin") return true;
    return false;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        notifications,
        currentUser,
        selectedTask,
        setSelectedTask,
        updateTask,
        deleteTask,
        moveTask,
        markNotificationRead,
        markAllNotificationsRead,
        canEditTask,
        canDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
