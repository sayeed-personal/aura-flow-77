import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, BookOpen, Target } from "lucide-react";

interface StudySession {
  subject: string;
  duration: number; // in minutes
  completed: boolean;
  icon: string;
}

const StudyTracker = () => {
  const [sessions] = useState<StudySession[]>([
    { subject: 'Islamic Studies', duration: 45, completed: true, icon: '📖' },
    { subject: 'Mathematics', duration: 60, completed: false, icon: '🔢' },
    { subject: 'Computer Science', duration: 90, completed: true, icon: '💻' },
    { subject: 'Arabic Language', duration: 30, completed: false, icon: '🔤' },
  ]);

  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [currentSubject, setCurrentSubject] = useState('Focus Time');

  const totalDuration = sessions.reduce((acc, session) => acc + session.duration, 0);
  const completedDuration = sessions
    .filter(session => session.completed)
    .reduce((acc, session) => acc + session.duration, 0);
  
  const progressPercentage = (completedDuration / totalDuration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePomodoro = () => {
    setPomodoroActive(!pomodoroActive);
  };

  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(25 * 60);
  };

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>📚</span>
            <span>Study Tracker</span>
          </CardTitle>
          <Badge variant="outline">
            {completedDuration}m / {totalDuration}m
          </Badge>
        </div>
        
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Goal Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pomodoro Timer */}
        <div className="p-4 bg-gradient-peaceful rounded-lg border">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{currentSubject}</span>
            </div>
            
            <div className="text-3xl font-bold text-primary">
              {formatTime(pomodoroTime)}
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={pomodoroActive ? "secondary" : "default"}
                size="sm"
                onClick={togglePomodoro}
                className="flex items-center space-x-1"
              >
                {pomodoroActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                <span>{pomodoroActive ? 'Pause' : 'Start'}</span>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={resetPomodoro}>
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Study Sessions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center space-x-1">
            <BookOpen className="h-3 w-3" />
            <span>Today's Sessions</span>
          </h4>
          
          {sessions.map((session, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50 ${
                session.completed ? 'bg-success/5 border-success/20' : 'border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{session.icon}</span>
                <div>
                  <p className={`text-sm font-medium ${session.completed ? 'text-success' : ''}`}>
                    {session.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.duration} minutes
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {session.completed && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    ✓ Done
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentSubject(session.subject)}
                >
                  <Play className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTracker;