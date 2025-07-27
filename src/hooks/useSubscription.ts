import { useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'basic' | 'advanced';

export interface SubscriptionData {
  tier: SubscriptionTier;
  trialDaysRemaining: number;
  isTrialActive: boolean;
}

const STORAGE_KEY = 'streak-master-subscription';
const TRIAL_DAYS = 20;

export function useSubscription() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    tier: 'free',
    trialDaysRemaining: TRIAL_DAYS,
    isTrialActive: true
  });

  // Load subscription data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSubscriptionData(parsed);
      } catch (error) {
        console.error('Error loading subscription data:', error);
      }
    } else {
      // First time user - start trial
      const newData = {
        tier: 'free' as SubscriptionTier,
        trialDaysRemaining: TRIAL_DAYS,
        isTrialActive: true
      };
      setSubscriptionData(newData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
  }, []);

  // Save subscription data whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptionData));
  }, [subscriptionData]);

  const upgradeTo = (tier: SubscriptionTier) => {
    setSubscriptionData(prev => ({
      ...prev,
      tier,
      isTrialActive: false
    }));
  };

  const useTrialDay = () => {
    setSubscriptionData(prev => ({
      ...prev,
      trialDaysRemaining: Math.max(0, prev.trialDaysRemaining - 1),
      isTrialActive: prev.trialDaysRemaining > 1
    }));
  };

  const hasFeature = (feature: string): boolean => {
    const { tier, isTrialActive } = subscriptionData;
    
    // During trial, all features are available
    if (isTrialActive) return true;
    
    const features = {
      'basic-streak': true, // Free feature
      'weekly-summary': true, // Free feature
      'motivational-tips': true, // Free feature
      'custom-goals': tier !== 'free',
      'distraction-toolkit': tier !== 'free',
      'extended-analytics': tier !== 'free',
      'urge-sos': tier === 'advanced',
      'personalized-insights': tier === 'advanced',
      'community-access': tier === 'advanced',
      'milestone-badges': tier === 'advanced'
    };
    
    return features[feature] || false;
  };

  return {
    subscriptionData,
    upgradeTo,
    useTrialDay,
    hasFeature,
    isTrialExpired: !subscriptionData.isTrialActive && subscriptionData.tier === 'free'
  };
}