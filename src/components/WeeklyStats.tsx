import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklyStatsProps {
  stats: {
    successDays: number;
    totalDays: number;
    percentage: number;
  };
  className?: string;
}

export function WeeklyStats({ stats, className }: WeeklyStatsProps) {
  const getEncouragementMessage = (percentage: number) => {
    if (percentage === 100) return "Perfect week! You're absolutely crushing it! 🏆";
    if (percentage >= 85) return "Amazing week! You're so close to perfection! ⭐";
    if (percentage >= 70) return "Great week! You're building real momentum! 🚀";
    if (percentage >= 50) return "Good progress! Every success counts! 💪";
    if (percentage > 0) return "You're trying, and that's what matters! 🌱";
    return "Tomorrow is a fresh start. You've got this! 🌅";
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">This Week's Progress</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Success Rate</span>
            <span className="text-lg font-semibold bg-gradient-fire bg-clip-text text-transparent">
              {stats.percentage}%
            </span>
          </div>

          <Progress 
            value={stats.percentage} 
            className="h-3 bg-muted"
          />

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {stats.successDays}/{stats.totalDays} days
            </span>
            <span className="text-muted-foreground">
              {7 - stats.successDays === 0 ? "Perfect!" : `${7 - stats.successDays} to go`}
            </span>
          </div>
        </div>

        <div className="bg-gradient-calm p-3 rounded-lg border border-accent">
          <p className="text-sm text-foreground font-medium text-center">
            {getEncouragementMessage(stats.percentage)}
          </p>
        </div>
      </div>
    </Card>
  );
}