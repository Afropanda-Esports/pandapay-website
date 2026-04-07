import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import pandaIcon from '../assets/panda-icon.svg';
import hamburgerIcon from '../assets/hamburger-icon.svg';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = ['About', 'Games', 'Blog', 'Community'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ── Nav bar ──────────────────────────────────────────── */}
      <nav className="relative h-20 lg:h-24 flex items-start pt-6 px-6 md:px-12 lg:px-20">

        {/* ── DESKTOP: panda icon absolutely centered ── */}
        <img
          src={pandaIcon}
          alt="PandaPay icon"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10"
        />

        {/* ── MOBILE: panda icon inline with wordmark ── */}
        <div className="flex lg:hidden items-center gap-2">
          <img src={pandaIcon} alt="PandaPay icon" className="w-8 h-8" />
          <span className="font-heading font-bold text-2xl text-text-primary tracking-tight">
            PandaPay
          </span>
        </div>

        {/* ── DESKTOP: wordmark left ── */}
        <span className="hidden lg:inline font-heading font-bold text-2xl text-text-primary tracking-tight">
          PandaPay
        </span>

        {/* ── DESKTOP: nav links + Shop now right ── */}
        <div className="hidden lg:flex ml-auto items-start gap-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-base text-text-secondary hover:text-text-primary transition-colors leading-tight"
              >
                {link}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <a
            href="#"
            className="font-sans text-sm font-medium text-text-primary px-5 py-2 rounded-full border-2 border-primary-500 hover:bg-primary-500/10 transition-colors whitespace-nowrap"
            style={{ boxShadow: 'var(--shadow-primary-glow-sm)' }}
          >
            Shop now
          </a>
        </div>

        {/* ── MOBILE: hamburger button ── */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden ml-auto p-1"
          aria-label="Open menu"
        >
          <img src={hamburgerIcon} alt="" className="w-7 h-7" />
        </button>
      </nav>

      {/* ── Mobile full-screen overlay — portalled to body to escape stacking context ── */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-nav-bg)' }}>


          <div className="relative flex flex-col h-full px-6 py-6">

            {/* Top row: logo + close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={pandaIcon} alt="PandaPay icon" className="w-8 h-8" />
                <span className="font-heading font-bold text-2xl text-text-primary tracking-tight">
                  PandaPay
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-bold text-3xl text-text-primary hover:text-primary-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Theme toggle + Shop now — pinned to bottom */}
            <div className="mt-auto flex flex-col gap-4">
              <ThemeToggle />
              <a
                href="#"
                className="block w-full text-center font-sans text-base font-medium text-text-primary py-4 rounded-full border-2 border-primary-500 hover:bg-primary-500/10 transition-colors"
                style={{ boxShadow: 'var(--shadow-primary-glow-md)' }}
              >
                Shop now
              </a>
            </div>

          </div>
        </div>
        , document.body)}
    </>
  );
};

export default Navbar;


