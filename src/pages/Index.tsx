import { useState } from "react";
import { StreakCounter } from "@/components/StreakCounter";
import { DailyCheckIn } from "@/components/DailyCheckIn";
import { ProgressCalendar } from "@/components/ProgressCalendar";
import { MotivationalTips } from "@/components/MotivationalTips";
import { WeeklyStats } from "@/components/WeeklyStats";
import { PricingDialog } from "@/components/PricingDialog";
import { useHabitTracker } from "@/hooks/useHabitTracker";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

const Index = () => {
  const [showPricing, setShowPricing] = useState(false);
  
  const { 
    data, 
    checkIn, 
    hasCheckedInToday, 
    getTodaySuccess, 
    getWeeklyStats 
  } = useHabitTracker();
  
  const { subscriptionData, useTrialDay, isTrialExpired } = useSubscription();
  const { toast } = useToast();

  const handleCheckIn = (success: boolean) => {
    checkIn(success);
    useTrialDay(); // Use a trial day when checking in
    
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-fire bg-clip-text text-transparent">
              Streak Master
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPricing(true)}
              className="flex items-center gap-2"
            >
              <Crown className="h-4 w-4" />
              {subscriptionData.tier === 'free' ? 'Upgrade' : 'Plans'}
            </Button>
          </div>
          <p className="text-muted-foreground">
            Build your freedom, one day at a time 🌟
          </p>
          {subscriptionData.isTrialActive && (
            <p className="text-sm text-warning mt-2">
              ⏰ Trial: {subscriptionData.trialDaysRemaining} days remaining
            </p>
          )}
          {isTrialExpired && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning">
                🔒 Trial expired. Upgrade to continue your journey!
              </p>
            </div>
          )}
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
            <MotivationalTips onOpenPricing={() => setShowPricing(true)} />
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

      <PricingDialog 
        open={showPricing} 
        onOpenChange={setShowPricing}
      />
    </div>
  );
};

export default Index;
