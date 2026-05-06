import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'theme';

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (pref: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialPreference(): ThemePreference {
  const stale = localStorage.getItem('pandapay-theme');
  if (stale === 'light' || stale === 'dark' || stale === 'system') {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      localStorage.setItem(THEME_STORAGE_KEY, stale);
    }
    localStorage.removeItem('pandapay-theme');
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'light';
}

function resolve(pref: ThemePreference): ResolvedTheme {
  return pref === 'system' ? getSystemTheme() : pref;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>(getInitialPreference);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolve(theme));

  useEffect(() => {
    const stale = localStorage.getItem('pandapay-theme');
    if (stale === 'light' || stale === 'dark' || stale === 'system') {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        localStorage.setItem(THEME_STORAGE_KEY, stale);
      }
      localStorage.removeItem('pandapay-theme');
    }
  }, []);

  // Apply dark class and persist preference
  useEffect(() => {
    const resolved = resolve(theme);
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.removeItem('color-scheme');
  }, [theme]);

  // Listen for OS theme changes when preference is 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const resolved: ResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(resolved);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      if (t === 'system') return 'light';
      if (t === 'light') return 'dark';
      return 'system';
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
