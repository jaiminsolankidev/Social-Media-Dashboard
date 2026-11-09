import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return storage.get(STORAGE_KEYS.THEME, 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
