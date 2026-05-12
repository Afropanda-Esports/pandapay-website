import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import iconDark from '../assets/logo/icon-dark.png';
import iconLight from '../assets/logo/icon-light.png';
import logoTextDark from '../assets/logo/logo-text-dark.png';
import logoTextLight from '../assets/logo/logo-text-light.png';
import ThemeToggle from './ThemeToggle';
import { WHATSAPP_URL } from '../siteContent';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#explore-shop' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Crypto', href: '#crypto' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsedLogo, setIsCollapsedLogo] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');
  const { resolvedTheme } = useTheme();

  const icon = resolvedTheme === 'dark' ? iconLight : iconDark;
  const logoText = resolvedTheme === 'dark' ? logoTextDark : logoTextLight;

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
      setIsScrolled(scrollY > 8);
      setIsCollapsedLogo(scrollY > 40);

      let currentHash = '#hero';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const top = section.getBoundingClientRect().top + window.scrollY;
        if (scrollY + 140 >= top) {
          currentHash = `#${id}`;
        }
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

  const navSurfaceStyle = useMemo(
    () => ({
      backgroundColor:
        resolvedTheme === 'dark' ? 'rgba(20, 14, 6, 0.80)' : 'rgba(245, 240, 232, 0.75)',
      borderBottomColor:
        resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
      backdropFilter: `blur(${isScrolled ? 20 : 16}px)`,
      WebkitBackdropFilter: `blur(${isScrolled ? 20 : 16}px)`,
      boxShadow: isScrolled
        ? resolvedTheme === 'dark'
          ? '0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)'
          : '0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)'
        : 'none',
    }),
    [isScrolled, resolvedTheme]
  );

  const pillStyle = useMemo(
    () => ({
      borderColor:
        resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    }),
    [resolvedTheme]
  );

  const mobileDrawerStyle = useMemo(
    () => ({
      backgroundColor:
        resolvedTheme === 'dark' ? 'rgba(20, 14, 6, 0.88)' : 'rgba(245, 240, 232, 0.88)',
      borderColor:
        resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }),
    [resolvedTheme]
  );

  const whatsappIcon = (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
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

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex w-full items-center px-6 transition-[height,box-shadow] duration-200 ease-out md:px-12 lg:px-20 ${isScrolled ? 'h-16' : 'h-20 lg:h-24'}`}
        style={navSurfaceStyle}
      >
        <div className="mx-auto flex w-full max-w-[1440px] min-w-0 items-center gap-3">
          <a
            href="#hero"
            className="flex min-w-0 items-center gap-2"
            aria-label="PandaPay home"
          >
            <img
              src={icon}
              alt="PandaPay icon"
              className={`h-10 w-10 shrink-0 transition-opacity duration-200 ease-out ${isCollapsedLogo ? 'opacity-100' : 'opacity-0'}`}
            />
            <span
              className={`overflow-hidden transition-[max-width,opacity,transform] duration-200 ease-out ${isCollapsedLogo ? 'max-w-0 opacity-0 -translate-x-1' : 'max-w-[320px] opacity-100 translate-x-0'}`}
            >
              <img
                src={logoText}
                alt="PandaPay"
                className="h-10 w-auto max-w-none shrink-0"
              />
            </span>
          </a>

          <div className="ml-auto hidden min-w-0 items-center justify-center gap-4 md:flex">
            <div
              className="inline-flex items-center rounded-full border bg-white/50 p-[4px] dark:bg-white/[0.04]"
              style={pillStyle}
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-150 ${isActive ? 'bg-primary-500/10 font-medium text-primary-500' : 'font-normal text-text-secondary hover:text-text-primary'}`}
                    style={{
                      backgroundColor: isActive
                        ? 'rgba(192, 75, 34, 0.10)'
                        : undefined,
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
            <ThemeToggle />
            <a
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(192,75,34,0.2),0_4px_12px_rgba(192,75,34,0.25)] transition-all duration-180 hover:-translate-y-px hover:bg-primary-600 hover:shadow-[0_2px_4px_rgba(192,75,34,0.25),0_8px_20px_rgba(192,75,34,0.3)]"
              aria-label="Start on WhatsApp"
            >
              {whatsappIcon}
              <span>Start on WhatsApp</span>
            </a>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-text-secondary transition-colors duration-150 hover:bg-[rgba(0,0,0,0.06)] hover:text-text-primary dark:border-white/10 dark:hover:bg-[rgba(255,255,255,0.08)]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${isOpen ? 'top-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${isOpen ? 'top-[7px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen ? (
              <>
                <motion.div
                  key="mobile-nav-backdrop"
                  className="fixed inset-0 z-[90] bg-black/20 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  key="mobile-nav-panel"
                  className="fixed inset-x-0 top-0 z-[100] border-b md:hidden"
                  style={mobileDrawerStyle}
                  initial={{ y: '-100%', opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0.6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-6 pt-20">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={logoText} alt="PandaPay" className="h-8 w-auto" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-text-secondary transition-colors duration-150 hover:bg-[rgba(0,0,0,0.06)] hover:text-text-primary dark:border-white/10 dark:hover:bg-[rgba(255,255,255,0.08)]"
                        aria-label="Close menu"
                      >
                        <X size={18} strokeWidth={1.9} />
                      </button>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-[28px] border border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.35)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                      {NAV_LINKS.map((link) => {
                        const isActive = activeHash === link.href;

                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`px-5 py-4 text-base transition-colors ${isActive ? 'font-medium text-primary-500' : 'text-text-primary hover:text-primary-500'}`}
                            style={{
                              backgroundColor: isActive
                                ? 'rgba(192, 75, 34, 0.08)'
                                : 'transparent',
                              borderBottom:
                                link !== NAV_LINKS[NAV_LINKS.length - 1]
                                  ? resolvedTheme === 'dark'
                                    ? '1px solid rgba(255,255,255,0.08)'
                                    : '1px solid rgba(0,0,0,0.08)'
                                  : 'none',
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </div>

                    <a
                      href={WHATSAPP_URL}
                      onClick={() => setIsOpen(false)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-3.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(192,75,34,0.2),0_4px_12px_rgba(192,75,34,0.25)] transition-all duration-180 hover:bg-primary-600"
                      aria-label="Start on WhatsApp"
                    >
                      {whatsappIcon}
                      <span>Start on WhatsApp</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
