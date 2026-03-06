import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'casaperks_theme';

function getSystemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

const themeStyles = {
  light: {
    backgroundColor: '#ffffff',
    color: '#111111',
  },
  dark: {
    backgroundColor: '#111111',
    color: '#f5f5f5',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [systemDark, setSystemDark] = useState(getSystemDark);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemDark(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);

    // Apply solid background color to the root element
    const { backgroundColor, color } = themeStyles[resolvedTheme];
    document.documentElement.style.backgroundColor = backgroundColor;
    document.documentElement.style.color = color;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
  }, [theme, resolvedTheme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState(prev => (prev === 'system' ? 'light' : prev === 'light' ? 'dark' : 'system'));

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}