import { useState, useEffect } from 'react';

export interface ProgressDay {
  date: string; // YYYY-MM-DD format
  success: boolean;
}

export interface HabitData {
  progressDays: ProgressDay[];
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null;
}

const STORAGE_KEY = 'streak-master-data';

export function useHabitTracker() {
  const [data, setData] = useState<HabitData>({
    progressDays: [],
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(parsed);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const hasCheckedInToday = () => {
    const today = getTodayString();
    return data.lastCheckIn === today;
  };

  const getTodaySuccess = () => {
    const today = getTodayString();
    const todayData = data.progressDays.find(d => d.date === today);
    return todayData?.success;
  };

  const calculateStreak = (progressDays: ProgressDay[], fromDate: string) => {
    const sortedDays = [...progressDays]
      .filter(d => d.date <= fromDate)
      .sort((a, b) => b.date.localeCompare(a.date));

    let streak = 0;
    const checkDate = new Date(fromDate);
    
    for (let i = 0; i < sortedDays.length; i++) {
      const dayDate = new Date(sortedDays[i].date);
      const expectedDate = new Date(checkDate);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (dayDate.toDateString() === expectedDate.toDateString() && sortedDays[i].success) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const checkIn = (success: boolean) => {
    const today = getTodayString();
    
    if (data.lastCheckIn === today) {
      return; // Already checked in today
    }

    const newProgressDays = [
      ...data.progressDays.filter(d => d.date !== today),
      { date: today, success }
    ];

    const newCurrentStreak = success ? calculateStreak(newProgressDays, today) : 0;
    const newLongestStreak = Math.max(data.longestStreak, newCurrentStreak);

    setData({
      progressDays: newProgressDays,
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastCheckIn: today
    });
  };

  const getWeeklyStats = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekAgo);
      date.setDate(date.getDate() + i);
      weekDays.push(date.toISOString().split('T')[0]);
    }
    
    const successDays = weekDays.filter(date => {
      const dayData = data.progressDays.find(d => d.date === date);
      return dayData?.success;
    }).length;
    
    return {
      successDays,
      totalDays: 7,
      percentage: Math.round((successDays / 7) * 100)
    };
  };

  return {
    data,
    checkIn,
    hasCheckedInToday: hasCheckedInToday(),
    getTodaySuccess: getTodaySuccess(),
    getWeeklyStats
  };
}