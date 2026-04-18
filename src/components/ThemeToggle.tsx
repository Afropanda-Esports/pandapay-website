import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { ReactNode } from 'react';

type ThemePreference = 'system' | 'light' | 'dark';

/** Delay before closing when pointer leaves trigger, so cursor can cross the gap to the portaled panel. */
const HOVER_CLOSE_MS = 280;

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
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, HOVER_CLOSE_MS);
  }, [clearCloseTimer]);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    if (dropDirection === 'up') {
      setPos({ top: rect.top + window.scrollY - 8, left: rect.right - 160 });
    } else {
      setPos({ top: rect.bottom + window.scrollY + 8, left: rect.right - 160 });
    }
  }, [dropDirection]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      )
        return;
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
      role="listbox"
      aria-label="Theme"
      className="fixed z-[9999] w-40 overflow-hidden rounded-xl bg-surface shadow-elevation-4"
      style={{
        top: dropDirection === 'up' ? undefined : pos.top,
        bottom: dropDirection === 'up' ? `calc(100vh - ${pos.top}px)` : undefined,
        left: pos.left,
      }}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={() => {
        clearCloseTimer();
        setOpen(false);
      }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => {
            setTheme(option.value);
            setOpen(false);
          }}
          className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
            theme === option.value
              ? 'bg-primary-500/5 text-primary-500'
              : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary'
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
        type="button"
        onMouseEnter={() => {
          clearCloseTimer();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-text-secondary transition-colors hover:text-text-primary"
        aria-label="Theme preference"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current.icon}
        <span className="hidden text-sm font-medium sm:inline">{current.label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {panel}
    </>
  );
};

export default ThemeToggle;
