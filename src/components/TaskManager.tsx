import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Flag } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete React assignment', completed: false, priority: 'high', dueDate: 'Today' },
    { id: '2', text: 'Read 20 pages of Islamic history', completed: true, priority: 'medium' },
    { id: '3', text: 'Plan weekend schedule', completed: false, priority: 'low', dueDate: 'Tomorrow' },
  ]);
  
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority: 'medium'
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>✅</span>
            <span>Tasks</span>
          </CardTitle>
          <Badge variant="outline">
            {completedCount}/{tasks.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add New Task */}
        <div className="flex space-x-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="flex-1"
          />
          <Button onClick={addTask} size="icon" variant="default">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Task List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50 ${
                task.completed ? 'bg-success/5 border-success/20' : 'border-border'
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.text}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Flag className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                  <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                  {task.dueDate && (
                    <>
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {task.dueDate}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-2xl mb-2 block">📝</span>
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskManager;