import { StreakCounter } from "@/components/StreakCounter";
import { DailyCheckIn } from "@/components/DailyCheckIn";
import { ProgressCalendar } from "@/components/ProgressCalendar";
import { MotivationalTips } from "@/components/MotivationalTips";
import { WeeklyStats } from "@/components/WeeklyStats";
import { useHabitTracker } from "@/hooks/useHabitTracker";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { 
    data, 
    checkIn, 
    hasCheckedInToday, 
    getTodaySuccess, 
    getWeeklyStats 
  } = useHabitTracker();
  
  const { toast } = useToast();

  const handleCheckIn = (success: boolean) => {
    checkIn(success);
    
    if (success) {
      toast({
        title: "🎉 Awesome!",
        description: "You stayed strong today! Keep building that streak!",
      });
    } else {
      toast({
        title: "🌱 No worries",
        description: "Tomorrow is a fresh start. You're still on this journey!",
      });
    }
  };

  const weeklyStats = getWeeklyStats();

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-fire bg-clip-text text-transparent">
            Streak Master
          </h1>
          <p className="text-muted-foreground">
            Build your freedom, one day at a time 🌟
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Streak Counter - Full width on mobile, spans 2 cols on larger screens */}
          <div className="md:col-span-2 lg:col-span-3">
            <StreakCounter streak={data.currentStreak} />
          </div>

          {/* Daily Check-in - Prominent position */}
          <div className="md:col-span-2 lg:col-span-2">
            <DailyCheckIn
              onCheckIn={handleCheckIn}
              hasCheckedInToday={hasCheckedInToday}
              todaySuccess={getTodaySuccess}
            />
          </div>

          {/* Weekly Stats */}
          <div className="lg:col-span-1">
            <WeeklyStats stats={weeklyStats} />
          </div>

          {/* Progress Calendar - Full width */}
          <div className="md:col-span-2 lg:col-span-3">
            <ProgressCalendar progressData={data.progressDays} />
          </div>

          {/* Motivational Tips */}
          <div className="md:col-span-2 lg:col-span-3">
            <MotivationalTips />
          </div>
        </div>

        {/* Footer Stats */}
        {data.longestStreak > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-card rounded-xl p-4 shadow-warm">
              <p className="text-sm text-muted-foreground mb-1">Your Personal Best</p>
              <p className="text-2xl font-bold bg-gradient-fire bg-clip-text text-transparent">
                🏆 {data.longestStreak} Day{data.longestStreak !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You've proven you can do it before - you can do it again! 💪
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
