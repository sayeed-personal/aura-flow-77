import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Flag, Trash2 } from "lucide-react";
import { useActivities } from '@/hooks/useActivities';
import { useToast } from '@/hooks/use-toast';

const TaskManager = () => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const { activities, addActivity, completeActivity, deleteActivity, getActivitiesByType } = useActivities();
  const { toast } = useToast();

  const tasks = getActivitiesByType('task');
  
  const addTask = async () => {
    if (newTask.trim()) {
      await addActivity('task', newTask, { priority });
      setNewTask('');
      setPriority('medium');
      toast({
        title: "Task Added",
        description: "Your task has been added successfully.",
      });
    }
  };

  const toggleTask = async (id: string) => {
    await completeActivity(id);
    toast({
      title: "Task Completed",
      description: "Great job on completing your task!",
    });
  };

  const removeTask = async (id: string) => {
    await deleteActivity(id);
    toast({
      title: "Task Deleted",
      description: "Your task has been removed.",
    });
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
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="flex-1"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button onClick={addTask} size="icon" variant="default">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
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
                  {task.activity_name}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Flag className={`h-3 w-3 ${getPriorityColor(task.metadata?.priority || 'medium')}`} />
                  <span className={`text-xs ${getPriorityColor(task.metadata?.priority || 'medium')}`}>
                    {(task.metadata?.priority || 'medium').toUpperCase()}
                  </span>
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTask(task.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
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