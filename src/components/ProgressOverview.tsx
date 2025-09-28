import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useActivities } from '@/hooks/useActivities';

interface ProgressItem {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}

const ProgressOverview = () => {
  const { getTodayActivities, getActivitiesByType } = useActivities();
  
  const todayActivities = getTodayActivities();
  const prayersCompleted = todayActivities.filter(a => a.activity_type === 'prayer' && a.completed).length;
  const tasksCompleted = todayActivities.filter(a => a.activity_type === 'task' && a.completed).length;
  const totalTasks = todayActivities.filter(a => a.activity_type === 'task').length;

  const progressItems: ProgressItem[] = [
    { label: "Prayers", value: prayersCompleted, max: 5, color: "text-primary", icon: "🕌" },
    { label: "Tasks", value: tasksCompleted, max: Math.max(totalTasks, 5), color: "text-success", icon: "✅" },
    { label: "Study Time", value: 2, max: 5, color: "text-sky-500", icon: "📚" },
    { label: "Activities", value: todayActivities.filter(a => a.completed).length, max: Math.max(todayActivities.length, 5), color: "text-orange-500", icon: "🎯" },
  ];

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📊</span>
          <span>Today's Progress</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {progressItems.map((item, index) => {
          const percentage = (item.value / item.max) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${item.color}`}>
                  {item.value}/{item.max}
                </span>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          );
        })}

        {/* Daily Score */}
        <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-primary-foreground text-center">
          <div className="text-2xl font-bold">
            {todayActivities.length > 0 ? Math.round((todayActivities.filter(a => a.completed).length / todayActivities.length) * 100) : 0}%
          </div>
          <div className="text-sm opacity-90">Daily Score</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;