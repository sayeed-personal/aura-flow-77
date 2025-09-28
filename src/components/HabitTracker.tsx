import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Droplets, Dumbbell, Heart, Coffee } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: React.ComponentType<{className?: string}>;
  streak: number;
  completedToday: boolean;
  target: number;
  current: number;
  unit: string;
  color: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 'water',
      name: 'Water Intake',
      icon: Droplets,
      streak: 5,
      completedToday: false,
      target: 8,
      current: 6,
      unit: 'glasses',
      color: 'text-sky-500'
    },
    {
      id: 'exercise',
      name: 'Exercise',
      icon: Dumbbell,
      streak: 3,
      completedToday: true,
      target: 1,
      current: 1,
      unit: 'session',
      color: 'text-orange-500'
    },
    {
      id: 'gratitude',
      name: 'Gratitude Journal',
      icon: Heart,
      streak: 7,
      completedToday: false,
      target: 3,
      current: 0,
      unit: 'entries',
      color: 'text-pink-500'
    },
    {
      id: 'nocodeine',
      name: 'No Caffeine',
      icon: Coffee,
      streak: 2,
      completedToday: true,
      target: 1,
      current: 1,
      unit: 'day',
      color: 'text-amber-600'
    }
  ]);

  const incrementHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId && habit.current < habit.target) {
        const newCurrent = habit.current + 1;
        const completed = newCurrent >= habit.target;
        return {
          ...habit,
          current: newCurrent,
          completedToday: completed,
          streak: completed && !habit.completedToday ? habit.streak + 1 : habit.streak
        };
      }
      return habit;
    }));
  };

  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completedToday).length;
  const completionRate = Math.round((completedHabits / totalHabits) * 100);

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>🎯</span>
            <span>Habits</span>
          </CardTitle>
          <Badge 
            variant={completedHabits === totalHabits ? "default" : "secondary"}
            className={completedHabits === totalHabits ? "bg-gradient-success" : ""}
          >
            {completedHabits}/{totalHabits}
          </Badge>
        </div>
        
        {/* Completion Rate */}
        <div className="text-center p-3 bg-gradient-peaceful rounded-lg">
          <div className="text-2xl font-bold text-primary">{completionRate}%</div>
          <div className="text-sm text-muted-foreground">Daily Completion</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {habits.map((habit) => {
          const Icon = habit.icon;
          const progressPercentage = (habit.current / habit.target) * 100;
          
          return (
            <div 
              key={habit.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50 ${
                habit.completedToday ? 'bg-success/5 border-success/20' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${habit.color}`} />
                  <span className="text-sm font-medium">{habit.name}</span>
                  {habit.streak > 0 && (
                    <div className="flex items-center space-x-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-orange-500 font-bold">
                        {habit.streak}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {habit.current}/{habit.target} {habit.unit}
                  </span>
                  
                  {!habit.completedToday && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => incrementHabit(habit.id)}
                      className="h-6 w-6 p-0"
                    >
                      +
                    </Button>
                  )}
                  
                  {habit.completedToday && (
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-gradient-primary h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Add Habit Button */}
        <Button 
          variant="outline" 
          className="w-full mt-4 border-dashed"
          size="sm"
        >
          + Add New Habit
        </Button>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;