import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyCheckInProps {
  onCheckIn: (success: boolean) => void;
  hasCheckedInToday: boolean;
  todaySuccess?: boolean;
  className?: string;
}

export function DailyCheckIn({ 
  onCheckIn, 
  hasCheckedInToday, 
  todaySuccess,
  className 
}: DailyCheckInProps) {
  const [celebrating, setCelebrating] = useState(false);

  const handleCheckIn = (success: boolean) => {
    onCheckIn(success);
    if (success) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 600);
    }
  };

  const getTodayMessage = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
    return `${today} - How did you do today?`;
  };

  if (hasCheckedInToday) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="space-y-4">
          <div className={cn(
            "text-4xl",
            celebrating && "animate-celebrate"
          )}>
            {todaySuccess ? "🎉" : "🌱"}
          </div>
          <h3 className="text-xl font-semibold">
            {todaySuccess ? "Awesome work today! 💪" : "Tomorrow's a fresh start! 🌅"}
          </h3>
          <p className="text-muted-foreground">
            {todaySuccess 
              ? "You stayed strong and resisted today. Keep building that streak!"
              : "No shame in setbacks. Every day is a new opportunity to grow stronger."
            }
          </p>
          <div className="pt-2">
            <span className="text-sm text-muted-foreground">
              See you tomorrow for another check-in! ⭐
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Daily Check-In 📝</h3>
          <p className="text-muted-foreground text-sm">
            {getTodayMessage()}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center font-medium">
            Did you stay strong today? 🌟
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              variant="success"
              size="xl"
              onClick={() => handleCheckIn(true)}
              className="flex-1 max-w-32"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Yes! ✅
            </Button>
            
            <Button
              variant="gentle"
              size="xl"
              onClick={() => handleCheckIn(false)}
              className="flex-1 max-w-32"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Not today ❌
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground bg-accent/20 p-3 rounded-lg">
          💙 Remember: Every check-in helps you stay accountable. You're brave for tracking your progress!
        </div>
      </div>
    </Card>
  );
}