import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { ReactNode } from 'react';

type ThemePreference = 'system' | 'light' | 'dark';

const options: { value: ThemePreference; label: string; icon: ReactNode }[] = [
  { value: 'system', label: 'System', icon: <Monitor size={16} /> },
  { value: 'light', label: 'Light', icon: <Sun size={16} /> },
  { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
];

interface ThemeToggleProps {
  dropDirection?: 'up' | 'down';
}

const ThemeToggle = ({ dropDirection = 'down' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    if (dropDirection === 'up') {
      setPos({ top: rect.top + window.scrollY - 8, left: rect.right - 160 });
    } else {
      setPos({ top: rect.bottom + window.scrollY + 8, left: rect.right - 160 });
    }
  }, [dropDirection]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  const current = options.find((o) => o.value === theme)!;

  const panel = open ? createPortal(
    <div
      ref={panelRef}
      className="fixed w-40 rounded-xl border border-border bg-surface shadow-elevation-3 overflow-hidden z-[9999]"
      style={{
        top: dropDirection === 'up' ? undefined : pos.top,
        bottom: dropDirection === 'up' ? `calc(100vh - ${pos.top}px)` : undefined,
        left: pos.left,
      }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => { setTheme(option.value); setOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
            theme === option.value
              ? 'text-primary-500 bg-primary-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Theme preference"
        aria-expanded={open}
      >
        {current.icon}
        <span className="text-sm font-medium hidden sm:inline">{current.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {panel}
    </>
  );
};

export default ThemeToggle;
