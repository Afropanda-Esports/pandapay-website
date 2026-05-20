import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, MessageCircle, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import iconDark from '../assets/logo/icon-dark.png';
import iconLight from '../assets/logo/icon-light.png';
import logoTextDark from '../assets/logo/logo-text-dark.png';
import logoTextLight from '../assets/logo/logo-text-light.png';
import ThemeToggle from './ThemeToggle';
import { botStatusDetail, botStatusNav, WHATSAPP_BOT_LIVE, WHATSAPP_URL } from '../siteContent';

const NAV_LINKS = [
  { label: 'Home', href: '#hero', short: '01' },
  { label: 'Shop', href: '#inventory', short: '02' },
  { label: 'How It Works', href: '#how-it-works', short: '03' },
  { label: 'FAQ', href: '#faq', short: '04' },
] as const;

function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.6A8.6 8.6 0 0 1 7.3 19l-3.3.8.9-3.1A8.6 8.6 0 1 1 20 11.6Z" />
      <path d="M9.5 8.9c.2-.5.5-.5.8-.5h.6c.2 0 .5 0 .7.4l.8 1.8c.1.3.1.5-.1.8l-.6.8c-.1.2-.2.3 0 .5.5.9 1.4 1.7 2.3 2.2.2.1.4.1.5 0l.8-.6c.2-.2.5-.2.7-.1l1.9.8c.4.2.4.4.4.7v.6c0 .3 0 .6-.5.8-.5.2-1.2.4-1.9.2-1.1-.2-2.4-1-3.6-2.2-1.2-1.2-2-2.5-2.2-3.6-.2-.7 0-1.4.2-1.8Z" />
    </svg>
  );
}

function StatusDot({ className = '' }: { className?: string }) {
  if (WHATSAPP_BOT_LIVE) {
    return (
      <span className={`relative flex h-2 w-2 ${className}`} aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
      </span>
    );
  }

  return (
    <span className={`relative flex h-2 w-2 ${className}`} aria-hidden>
      <span className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
    </span>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsedLogo, setIsCollapsedLogo] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');
  const { resolvedTheme } = useTheme();

  const icon = resolvedTheme === 'dark' ? iconLight : iconDark;
  const logoText = resolvedTheme === 'dark' ? logoTextDark : logoTextLight;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));

    const updateNavState = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 12);
      setIsCollapsedLogo(scrollY > 48);

      let currentHash = '#hero';
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (scrollY + 160 >= top) currentHash = `#${id}`;
      }
      setActiveHash(currentHash);
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('hashchange', updateNavState);
    return () => {
      window.removeEventListener('scroll', updateNavState);
      window.removeEventListener('hashchange', updateNavState);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const islandInnerStyle = useMemo(
    () => ({
      backgroundColor: isDark ? 'rgba(28, 19, 10, 0.82)' : 'rgba(255, 255, 255, 0.72)',
      backdropFilter: 'blur(20px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
    }),
    [isDark],
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5 lg:px-12">
        <motion.div
          className="pointer-events-auto mx-auto w-full max-w-5xl"
          initial={false}
          animate={{
            y: isScrolled ? 0 : 0,
            scale: isScrolled ? 0.985 : 1,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          {/* Gradient ring */}
          <motion.div
            className="rounded-[1.35rem] p-px"
            animate={{
              boxShadow: isScrolled
                ? isDark
                  ? '0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px -12px rgba(0,0,0,0.55), 0 0 32px -8px rgba(255,107,1,0.18)'
                  : '0 0 0 1px rgba(0,0,0,0.05), 0 12px 40px -12px rgba(12,12,12,0.1), 0 0 28px -8px rgba(255,107,1,0.14)'
                : isDark
                  ? '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px -8px rgba(0,0,0,0.35)'
                  : '0 0 0 1px rgba(0,0,0,0.04), 0 4px 20px -8px rgba(12,12,12,0.06)',
            }}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(255,107,1,0.45), rgba(255,107,1,0.12), rgba(255,107,1,0.2))'
                : 'linear-gradient(135deg, rgba(255,107,1,0.35), rgba(255,107,1,0.1), rgba(255,107,1,0.15))',
            }}
          >
            <nav
              className={`flex items-center gap-3 rounded-[1.3rem] px-3 transition-[padding] duration-200 md:gap-4 md:px-4 ${isScrolled ? 'py-2' : 'py-2.5'}`}
              style={islandInnerStyle}
              aria-label="Main"
            >
              {/* Logo */}
              <a
                href="#hero"
                className="group flex min-w-0 shrink-0 items-center gap-2.5 pr-1"
                aria-label="PandaPay home"
              >
                <motion.img
                  src={icon}
                  alt=""
                  className={`h-9 w-9 shrink-0 overflow-hidden md:h-10 md:w-10 ${!isCollapsedLogo ? 'sm:hidden' : ''}`}
                  animate={{ scale: isCollapsedLogo ? 1 : 0.92, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
                <motion.span
                  className="hidden overflow-hidden sm:block"
                  animate={{
                    maxWidth: isCollapsedLogo ? 0 : 200,
                    opacity: isCollapsedLogo ? 0 : 1,
                    x: isCollapsedLogo ? -8 : 0,
                  }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={logoText} alt="PandaPay" className="h-8 w-auto" />
                </motion.span>
              </a>

              {/* Desktop nav — center dock */}
              <motion.div
                className="relative mx-auto hidden min-w-0 flex-1 justify-center md:flex"
                layout
              >
                <motion.div
                  className="relative inline-flex items-center gap-0.5 rounded-full p-1"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = activeHash === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className={`relative z-10 rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-150 lg:px-4 lg:text-sm ${
                          isActive
                            ? 'font-semibold text-primary-500'
                            : 'font-medium text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 rounded-full bg-primary-500/12 ring-1 ring-primary-500/20"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative">{link.label}</span>
                      </a>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Desktop actions */}
              <motion.div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
                <span
                  className="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-text-muted lg:inline-flex"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <StatusDot />
                  {botStatusNav}
                </span>
                <ThemeToggle />
                <a
                  href={WHATSAPP_URL}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_4px_16px_-2px_rgba(255,107,1,0.45)] transition-all duration-200 hover:bg-primary-600 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset,0_8px_24px_-4px_rgba(255,107,1,0.5)]"
                  aria-label="Start on WhatsApp"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden
                  />
                  <WhatsAppIcon />
                  <span className="hidden lg:inline">Start on WhatsApp</span>
                  <span className="lg:hidden">WhatsApp</span>
                </a>
              </motion.div>

              {/* Mobile actions */}
              <div className="ml-auto flex items-center gap-2 md:hidden">
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-[0_4px_14px_-2px_rgba(255,107,1,0.45)]"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen((open) => !open)}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  }}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  <span className="relative h-4 w-5">
                    <motion.span
                      className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current"
                      animate={isOpen ? { top: 7, rotate: 45 } : { top: 0, rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current"
                      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    <motion.span
                      className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current"
                      animate={isOpen ? { top: 7, rotate: -45 } : { top: 14, rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </button>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      </header>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen ? (
              <>
                <motion.div
                  key="mobile-backdrop"
                  className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  key="mobile-panel"
                  className="fixed inset-y-0 right-0 z-[100] flex w-[min(100%,340px)] flex-col md:hidden"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                  style={{
                    backgroundColor: isDark ? '#0c0c0c' : '#ffffff',
                  }}
                >
                  <motion.div
                    className="pointer-events-none absolute -left-24 top-20 h-48 w-48 rounded-full bg-primary-500/25 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="pointer-events-none absolute -right-8 bottom-32 h-40 w-40 rounded-full bg-primary-500/15 blur-3xl"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <motion.div
                    className="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/8"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <div className="flex items-center gap-2">
                      <img src={logoText} alt="PandaPay" className="h-7 w-auto" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-text-primary dark:bg-white/8"
                      aria-label="Close menu"
                    >
                      <X size={20} strokeWidth={1.75} />
                    </button>
                  </motion.div>

                  <div className="flex flex-1 flex-col px-5 py-6">
                    <motion.p
                      className="mb-6 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-500"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 }}
                    >
                      <Sparkles size={14} aria-hidden />
                      Navigate
                    </motion.p>

                    <nav className="flex flex-col gap-1" aria-label="Mobile">
                      {NAV_LINKS.map((link, index) => {
                        const isActive = activeHash === link.href;
                        return (
                          <motion.a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`group flex items-baseline gap-4 rounded-2xl px-4 py-4 transition-colors ${
                              isActive
                                ? 'bg-primary-500/10 text-primary-500'
                                : 'text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                            }`}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span
                              className={`font-heading text-sm font-bold tabular-nums ${
                                isActive ? 'text-primary-500' : 'text-text-muted'
                              }`}
                            >
                              {link.short}
                            </span>
                            <span className="font-heading text-2xl font-bold leading-none">
                              {link.label}
                            </span>
                            {isActive ? (
                              <ArrowUpRight
                                size={18}
                                className="ml-auto self-center text-primary-500"
                                aria-hidden
                              />
                            ) : null}
                          </motion.a>
                        );
                      })}
                    </nav>

                    <motion.div
                      className="mt-auto space-y-4 pt-8"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <motion.div
                        className="flex items-center gap-3 rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 dark:border-white/8 dark:bg-white/[0.04]"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075e54] text-white">
                          <MessageCircle size={18} aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                            Panda Pay
                            <StatusDot />
                          </p>
                          <p className="text-xs text-text-muted">{botStatusDetail}</p>
                        </div>
                      </motion.div>

                      <div className="flex items-center gap-3">
                        <ThemeToggle className="!h-11 !w-11" />
                        <a
                          href={WHATSAPP_URL}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-4px_rgba(255,107,1,0.45)]"
                        >
                          <WhatsAppIcon />
                          Start on WhatsApp
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Navbar;
