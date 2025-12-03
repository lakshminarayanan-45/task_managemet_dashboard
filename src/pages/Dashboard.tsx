import { useTaskContext } from "@/context/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, ListTodo } from "lucide-react";

export default function Dashboard() {
  const { tasks } = useTaskContext();

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: Clock,
      color: "text-status-in-progress",
      bg: "bg-status-in-progress/10",
    },
    {
      title: "In Review",
      value: tasks.filter((t) => t.status === "review").length,
      icon: AlertCircle,
      color: "text-status-review",
      bg: "bg-status-review/10",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      icon: CheckCircle,
      color: "text-status-done",
      bg: "bg-status-done/10",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your tasks and progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Assigned to {task.assignee.name}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground capitalize px-2 py-1 rounded bg-background">
                  {task.status.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
