import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}

const ProgressOverview = () => {
  const progressItems: ProgressItem[] = [
    { label: "Prayers", value: 1, max: 5, color: "text-primary", icon: "🕌" },
    { label: "Study Tasks", value: 3, max: 8, color: "text-success", icon: "📚" },
    { label: "Water Intake", value: 6, max: 8, color: "text-sky-500", icon: "💧" },
    { label: "Gym Sessions", value: 2, max: 3, color: "text-orange-500", icon: "💪" },
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
          <div className="text-2xl font-bold">72%</div>
          <div className="text-sm opacity-90">Daily Score</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;