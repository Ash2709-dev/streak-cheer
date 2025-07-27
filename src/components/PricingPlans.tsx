import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubscription, SubscriptionTier } from "@/hooks/useSubscription";

interface PricingPlansProps {
  className?: string;
  onClose?: () => void;
}

export function PricingPlans({ className, onClose }: PricingPlansProps) {
  const { subscriptionData, upgradeTo } = useSubscription();

  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Free Trial',
      price: 'Free',
      duration: '20 days',
      icon: Flame,
      features: [
        'Daily Check-In tracking',
        'Basic Streak Counter',
        '3 Motivational Messages/Day',
        'Weekly Progress Summary',
        'Simple calendar view'
      ],
      popular: false,
      color: 'text-muted-foreground'
    },
    {
      id: 'basic' as SubscriptionTier,
      name: 'Basic Plan',
      price: '$5',
      duration: '/month',
      icon: Zap,
      features: [
        'All Free features',
        'Custom Streak Goals',
        'Distraction Toolkit',
        'Extended Analytics',
        'Progress charts',
        'No ads'
      ],
      popular: true,
      color: 'text-primary'
    },
    {
      id: 'advanced' as SubscriptionTier,
      name: 'Advanced Plan',
      price: '$9',
      duration: '/month',
      icon: Crown,
      features: [
        'All Basic features',
        '24/7 Urge-SOS Chat',
        'Personalized Insights',
        'VIP Community Access',
        'Milestone Badges',
        'Priority support'
      ],
      popular: false,
      color: 'text-warning'
    }
  ];

  const handleUpgrade = (tier: SubscriptionTier) => {
    if (tier !== 'free') {
      upgradeTo(tier);
      onClose?.();
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-fire bg-clip-text text-transparent">
          Choose Your Journey 🚀
        </h2>
        <p className="text-muted-foreground">
          Every warrior needs the right tools. Pick what works for you.
        </p>
        {subscriptionData.isTrialActive && (
          <Badge variant="secondary" className="mt-2">
            Trial: {subscriptionData.trialDaysRemaining} days left
          </Badge>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = subscriptionData.tier === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={cn(
                "relative p-6 transition-all duration-300",
                plan.popular 
                  ? "border-primary shadow-lg scale-105" 
                  : "hover:shadow-md",
                isCurrentPlan && "ring-2 ring-primary"
              )}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary"
                >
                  Most Popular 🔥
                </Badge>
              )}

              <div className="text-center space-y-4">
                <div className={cn("p-3 rounded-full w-fit mx-auto", 
                  plan.popular ? "bg-primary/10" : "bg-accent/50"
                )}>
                  <Icon className={cn("h-8 w-8", plan.color)} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className="text-3xl font-bold bg-gradient-fire bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrentPlan}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  {isCurrentPlan 
                    ? "Current Plan" 
                    : plan.id === 'free' 
                      ? "Start Free Trial" 
                      : "Upgrade Now"
                  }
                </Button>

                {plan.id === 'basic' && (
                  <p className="text-xs text-muted-foreground">
                    Or $12 for 90 days
                  </p>
                )}
                {plan.id === 'advanced' && (
                  <p className="text-xs text-muted-foreground">
                    Or $25 lifetime access
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground bg-accent/20 p-4 rounded-lg">
        💝 <strong>Compassionate Pricing:</strong> Financial hardship? Contact us for scholarship options. 
        Your recovery journey shouldn't depend on your wallet.
      </div>
    </div>
  );
}