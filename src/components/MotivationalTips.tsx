import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";
import { UpgradePrompt } from "./UpgradePrompt";

interface MotivationalTipsProps {
  className?: string;
  onOpenPricing?: () => void;
}

export function MotivationalTips({ className, onOpenPricing }: MotivationalTipsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const { hasFeature } = useSubscription();

  const basicTips = [
    {
      title: "5-Minute Rule 🏃‍♂️",
      content: "When urges hit, do 5 minutes of exercise - pushups, jumping jacks, or a cold shower. Physical activity rewires your brain!"
    },
    {
      title: "The Power of Now 🧘‍♂️",
      content: "Urges are temporary waves. Take 10 deep breaths and remind yourself: 'This feeling will pass in 15-20 minutes.'"
    },
    {
      title: "Your Future Self 🌟",
      content: "Picture yourself 30 days from now - how proud and confident you'll feel. That person is counting on the choice you make right now."
    }
  ];

  const premiumTips = [
    ...basicTips,
    {
      title: "Channel Your Energy 🎯",
      content: "Redirect that energy into something creative - write, draw, learn a skill, or call a friend. You're transforming, not just resisting!"
    },
    {
      title: "Progress Over Perfection 📈",
      content: "Every 'no' to temptation is a 'yes' to your growth. You're building mental strength that applies to every area of life."
    },
    {
      title: "Environmental Setup 🏠",
      content: "Change your environment when feeling triggered. Go to a public space, step outside, or move to a different room."
    },
    {
      title: "Remember Your Why 💭",
      content: "What motivated you to start this journey? Better relationships? More energy? Clearer mind? Hold onto that vision."
    },
    {
      title: "Community Support 🤝",
      content: "You're not alone in this. Millions are on the same journey. Your struggle is valid and your effort is heroic."
    },
    {
      title: "Advanced Breathing 🌬️",
      content: "Try the 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8. This activates your parasympathetic nervous system."
    },
    {
      title: "Trigger Mapping 🗺️",
      content: "Notice patterns: What time? What mood? What environment? Awareness is the first step to breaking automatic responses."
    }
  ];

  const tips = hasFeature('distraction-toolkit') ? premiumTips : basicTips;

  const getNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const currentTip = tips[currentTipIndex];

  if (!hasFeature('motivational-tips')) {
    return (
      <UpgradePrompt
        className={className}
        feature="Advanced Tips & Strategies"
        description="Get access to proven techniques and personalized strategies to overcome urges and build lasting habits."
        requiredTier="basic"
        onUpgrade={() => onOpenPricing?.()}
      />
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">
              {hasFeature('distraction-toolkit') ? 'Advanced Tips' : 'Quick Tips'}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNextTip}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-gradient-calm p-4 rounded-lg border border-accent">
          <h4 className="font-semibold text-foreground mb-2">
            {currentTip.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentTip.content}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-1">
            {tips.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentTipIndex 
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground bg-accent/20 p-2 rounded">
          💡 Tip {currentTipIndex + 1} of {tips.length} - Click refresh for more wisdom!
          {!hasFeature('distraction-toolkit') && (
            <Button 
              variant="link" 
              size="sm" 
              className="ml-2 h-auto p-0 text-xs text-primary"
              onClick={() => onOpenPricing?.()}
            >
              Unlock more tips →
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}