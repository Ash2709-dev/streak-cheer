import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgressDay {
  date: string; // YYYY-MM-DD format
  success: boolean;
}

interface ProgressCalendarProps {
  progressData: ProgressDay[];
  className?: string;
}

export function ProgressCalendar({ progressData, className }: ProgressCalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getDayStatus = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = progressData.find(d => d.date === dateStr);
    
    const dayDate = new Date(currentYear, currentMonth, day);
    const isToday = dayDate.toDateString() === today.toDateString();
    const isFuture = dayDate > today;
    
    return {
      hasData: !!dayData,
      success: dayData?.success || false,
      isToday,
      isFuture
    };
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-1">Progress Calendar 📅</h3>
          <p className="text-muted-foreground text-sm">{monthName}</p>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="p-2"></div>;
            }

            const status = getDayStatus(day);
            
            return (
              <div
                key={day}
                className={cn(
                  "p-2 text-center text-sm rounded-lg transition-all duration-200 relative",
                  "hover:scale-105",
                  {
                    // Success day
                    "bg-gradient-success text-success-foreground font-semibold shadow-sm": 
                      status.hasData && status.success,
                    
                    // Failed day
                    "bg-muted text-muted-foreground": 
                      status.hasData && !status.success,
                    
                    // Today
                    "ring-2 ring-primary ring-offset-2 bg-accent": 
                      status.isToday && !status.hasData,
                    
                    // Future days
                    "text-muted-foreground/50": 
                      status.isFuture,
                    
                    // Past days without data
                    "hover:bg-accent/50": 
                      !status.hasData && !status.isFuture && !status.isToday
                  }
                )}
              >
                {day}
                {status.hasData && status.success && (
                  <div className="absolute -top-1 -right-1 text-xs">🔥</div>
                )}
                {status.isToday && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-success rounded"></div>
            <span>Success</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-primary rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </Card>
  );
}