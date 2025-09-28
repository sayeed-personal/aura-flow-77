import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import PrayerTracker from "@/components/PrayerTracker";
import TaskManager from "@/components/TaskManager";
import StudyTracker from "@/components/StudyTracker";
import HabitTracker from "@/components/HabitTracker";
import QuickNotes from "@/components/QuickNotes";
import MotivationalQuote from "@/components/MotivationalQuote";
import ProgressOverview from "@/components/ProgressOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-peaceful">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(158,64,52,0.1)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />
      
      <div className="relative z-10">
        <DashboardHeader />
        
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Welcome Section with Motivational Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MotivationalQuote />
            </div>
            <div className="lg:col-span-1">
              <ProgressOverview />
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Prayer Tracker - Always prominent */}
            <div className="xl:col-span-1">
              <PrayerTracker />
            </div>

            {/* Task Manager */}
            <div className="xl:col-span-1">
              <TaskManager />
            </div>

            {/* Study Tracker */}
            <div className="xl:col-span-1">
              <StudyTracker />
            </div>

            {/* Habit Tracker */}
            <div className="lg:col-span-1">
              <HabitTracker />
            </div>

            {/* Quick Notes */}
            <div className="lg:col-span-1">
              <QuickNotes />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;