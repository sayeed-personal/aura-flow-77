import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { useActivities } from '@/hooks/useActivities';
import { useToast } from '@/hooks/use-toast';

const prayersData = [
  { name: 'Fajr', arabicName: 'الفجر', time: '5:30 AM' },
  { name: 'Dhuhr', arabicName: 'الظهر', time: '12:15 PM' },
  { name: 'Asr', arabicName: 'العصر', time: '3:45 PM' },
  { name: 'Maghrib', arabicName: 'المغرب', time: '6:20 PM' },
  { name: 'Isha', arabicName: 'العشاء', time: '7:45 PM' },
];

const PrayerTracker = () => {
  const { activities, addActivity, completeActivity, getTodayActivities } = useActivities();
  const { toast } = useToast();

  const todayPrayers = getTodayActivities().filter(activity => activity.activity_type === 'prayer');

  const isPrayerCompleted = (prayerName: string) => {
    return todayPrayers.some(activity => 
      activity.activity_name === prayerName && activity.completed
    );
  };

  const togglePrayer = async (prayerName: string, arabicName: string) => {
    const existingPrayer = todayPrayers.find(activity => activity.activity_name === prayerName);
    
    if (existingPrayer && !existingPrayer.completed) {
      await completeActivity(existingPrayer.id);
      toast({
        title: "Prayer Completed",
        description: `${prayerName} (${arabicName}) has been marked as completed.`,
      });
    } else if (!existingPrayer) {
      const newPrayer = await addActivity('prayer', prayerName, { arabicName });
      if (newPrayer) {
        await completeActivity(newPrayer.id);
        toast({
          title: "Prayer Completed",
          description: `${prayerName} (${arabicName}) has been completed.`,
        });
      }
    }
  };

  const completedCount = todayPrayers.filter(p => p.completed).length;
  const completionPercentage = (completedCount / prayersData.length) * 100;

  return (
    <Card className="bg-gradient-spiritual shadow-spiritual animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>🕌</span>
            <span>Daily Prayers</span>
          </CardTitle>
          <Badge 
            variant={completedCount === 5 ? "default" : "secondary"}
            className={completedCount === 5 ? "bg-gradient-success" : ""}
          >
            {completedCount}/5
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location & Time Info */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Next: Asr in 2h 15m</span>
          </div>
        </div>

        {/* Prayer List */}
        <div className="space-y-3">
          {prayersData.map((prayer) => {
            const isCompleted = isPrayerCompleted(prayer.name);
            
            return (
              <div 
                key={prayer.name}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                  isCompleted ? 'bg-success/10 border border-success/20' : 'border border-border'
                }`}
              >
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => togglePrayer(prayer.name, prayer.arabicName)}
                  className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${isCompleted ? 'text-success line-through' : ''}`}>
                      {prayer.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {prayer.arabicName}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {prayer.time}
                  </span>
                </div>

                {isCompleted && (
                  <span className="text-success animate-scale-in">✓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedCount === 5 && (
          <div className="text-center p-4 bg-gradient-success text-success-foreground rounded-lg animate-scale-in">
            <span className="text-lg">🎉</span>
            <p className="font-medium">Mashallah! All prayers completed today!</p>
            <p className="text-sm opacity-90">May Allah accept your prayers</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrayerTracker;