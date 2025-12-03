import { useTaskContext } from "@/context/TaskContext";
import { KanbanColumn } from "./KanbanColumn";
import { TaskStatus } from "@/types/task";

const columns: { status: TaskStatus; title: string }[] = [
  { status: "todo", title: "To Do" },
  { status: "in-progress", title: "In Progress" },
  { status: "review", title: "Review" },
  { status: "done", title: "Done" },
];

interface KanbanBoardProps {
  filteredTasks?: ReturnType<typeof useTaskContext>["tasks"];
}

export function KanbanBoard({ filteredTasks }: KanbanBoardProps) {
  const { tasks, moveTask } = useTaskContext();
  const displayTasks = filteredTasks || tasks;

  const handleDrop = (taskId: string, newStatus: TaskStatus) => {
    moveTask(taskId, newStatus);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          status={column.status}
          title={column.title}
          tasks={displayTasks.filter((task) => task.status === column.status)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
