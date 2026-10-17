'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types';
import { THEME_OPTIONS } from '@/data/clinicData';

interface CustomColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  customColors: CustomColors;
  setCustomColors: (colors: CustomColors) => void;
  resetToThemeDefault: () => void;
  themeOptions: typeof THEME_OPTIONS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const THEME_API = `${API_URL}/api/theme`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('clinical');
  const [customColors, setCustomColorsState] = useState<CustomColors>({});

  // Sync theme with Backend (Managed solely by Admin)
  useEffect(() => {
    let isMounted = true;

    const fetchAdminTheme = async () => {
      try {
        const res = await fetch(THEME_API);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.theme) {
            const adminTheme = json.data.theme as ThemeMode;
            if (['clinical', 'emerald', 'sapphire', 'rose', 'dark'].includes(adminTheme)) {
              if (isMounted) {
                setThemeState(adminTheme);
                document.documentElement.setAttribute('data-theme', adminTheme);
              }
            }
          }
        }
      } catch {
        // Fallback to local default if backend is unavailable
      }
    };

    // Fetch theme once on mount / page refresh
    fetchAdminTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setCustomColors = (colors: CustomColors) => {
    const merged = { ...customColors, ...colors };
    setCustomColorsState(merged);
  };

  const resetToThemeDefault = () => {
    setCustomColorsState({});
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        customColors,
        setCustomColors,
        resetToThemeDefault,
        themeOptions: THEME_OPTIONS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
