import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradePromptProps {
  feature: string;
  description: string;
  requiredTier: 'basic' | 'advanced';
  onUpgrade: () => void;
  className?: string;
}

export function UpgradePrompt({ 
  feature, 
  description, 
  requiredTier, 
  onUpgrade,
  className 
}: UpgradePromptProps) {
  const tierInfo = {
    basic: {
      name: 'Basic Plan',
      price: '$5/month',
      color: 'text-primary'
    },
    advanced: {
      name: 'Advanced Plan', 
      price: '$9/month',
      color: 'text-warning'
    }
  };

  const tier = tierInfo[requiredTier];

  return (
    <Card className={cn("p-6 text-center space-y-4 bg-gradient-calm border-dashed", className)}>
      <div className="flex justify-center">
        <div className="p-3 rounded-full bg-accent/50">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{feature}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Crown className={cn("h-4 w-4", tier.color)} />
          <span className="text-sm font-medium">
            Unlock with {tier.name}
          </span>
        </div>

        <Button onClick={onUpgrade} className="w-full">
          Upgrade to {tier.name} - {tier.price}
        </Button>

        <p className="text-xs text-muted-foreground">
          💪 Invest in your freedom - you're worth it!
        </p>
      </div>
    </Card>
  );
}