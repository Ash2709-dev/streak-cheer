import { cn } from "@/lib/utils";

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
  const getFireSize = (streak: number) => {
    if (streak >= 30) return "text-6xl";
    if (streak >= 14) return "text-5xl";
    if (streak >= 7) return "text-4xl";
    if (streak >= 3) return "text-3xl";
    return "text-2xl";
  };

  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) return "Ready to start your journey? 💪";
    if (streak === 1) return "Great start! Every journey begins with one step 🌱";
    if (streak < 7) return "Building momentum! You're doing amazing 🚀";
    if (streak < 14) return "Wow! You're on fire! Keep going 🔥";
    if (streak < 30) return "Incredible streak! You're unstoppable! ⚡";
    if (streak < 90) return "LEGEND status! You're inspiring! 🏆";
    return "MASTER level achieved! You're a true warrior! 👑";
  };

  return (
    <div className={cn("text-center p-8 bg-gradient-calm rounded-2xl shadow-warm", className)}>
      <div className="mb-4">
        <div className={cn(
          "animate-pulse-glow transition-all duration-500",
          getFireSize(streak)
        )}>
          {streak > 0 ? "🔥" : "💫"}
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-fire bg-clip-text text-transparent">
          {streak} Day{streak !== 1 ? 's' : ''}
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Current Streak
        </p>
      </div>

      <div className="mt-6 p-4 bg-accent/30 rounded-xl">
        <p className="text-foreground font-medium">
          {getMotivationalMessage(streak)}
        </p>
      </div>
    </div>
  );
}