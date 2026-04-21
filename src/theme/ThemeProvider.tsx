import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import lightTheme from './light';
import darkTheme from './dark';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(true); // Default dark as per Figma

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
