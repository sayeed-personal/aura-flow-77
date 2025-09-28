import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Activity {
  id: string;
  activity_type: string;
  activity_name: string;
  completed: boolean;
  metadata: any;
  created_at: string;
  completed_at: string | null;
}

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch activities
  const fetchActivities = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new activity
  const addActivity = async (
    activityType: string,
    activityName: string,
    metadata: any = {}
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          activity_name: activityName,
          metadata,
        })
        .select()
        .single();

      if (error) throw error;

      setActivities(prev => [data, ...prev]);
      return data;
    } catch (error: any) {
      console.error('Error adding activity:', error);
      toast({
        title: "Error",
        description: "Failed to add activity",
        variant: "destructive",
      });
    }
  };

  // Complete activity
  const completeActivity = async (activityId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activities')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', activityId)
        .select()
        .single();

      if (error) throw error;

      setActivities(prev =>
        prev.map(activity =>
          activity.id === activityId ? data : activity
        )
      );
      return data;
    } catch (error: any) {
      console.error('Error completing activity:', error);
      toast({
        title: "Error",
        description: "Failed to complete activity",
        variant: "destructive",
      });
    }
  };

  // Update activity
  const updateActivity = async (activityId: string, updates: Partial<Activity>) => {
    try {
      const { data, error } = await supabase
        .from('user_activities')
        .update(updates)
        .eq('id', activityId)
        .select()
        .single();

      if (error) throw error;

      setActivities(prev =>
        prev.map(activity =>
          activity.id === activityId ? data : activity
        )
      );
      return data;
    } catch (error: any) {
      console.error('Error updating activity:', error);
      toast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive",
      });
    }
  };

  // Delete activity
  const deleteActivity = async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('user_activities')
        .delete()
        .eq('id', activityId);

      if (error) throw error;

      setActivities(prev => prev.filter(activity => activity.id !== activityId));
    } catch (error: any) {
      console.error('Error deleting activity:', error);
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  // Get activities by type
  const getActivitiesByType = (type: string) => {
    return activities.filter(activity => activity.activity_type === type);
  };

  // Get today's activities
  const getTodayActivities = () => {
    const today = new Date().toDateString();
    return activities.filter(activity => 
      new Date(activity.created_at).toDateString() === today
    );
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    loading,
    addActivity,
    completeActivity,
    updateActivity,
    deleteActivity,
    getActivitiesByType,
    getTodayActivities,
    refetch: fetchActivities,
  };
};