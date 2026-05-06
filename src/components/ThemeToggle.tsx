import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type ThemeIconButtonProps = {
  className?: string;
};

const themeOrder = ['light', 'dark', 'system'] as const;

export default function ThemeToggle({ className = '' }: ThemeIconButtonProps) {
  const { theme, setTheme } = useTheme();

  const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const label = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-text-secondary transition-colors duration-150 hover:bg-[rgba(0,0,0,0.06)] hover:text-text-primary dark:border-white/10 dark:hover:bg-[rgba(255,255,255,0.08)] ${className}`}
      aria-label={`Theme: ${label}`}
      title={label}
    >
      <Icon size={17} strokeWidth={1.9} />
    </button>
  );
}
