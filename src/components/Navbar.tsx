import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import pandaIcon from '../assets/panda-icon.svg';
import hamburgerIcon from '../assets/hamburger-icon.svg';

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
          <span className="font-heading font-bold text-2xl text-neutral-100 tracking-tight">
            PandaPay
          </span>
        </div>

        {/* ── DESKTOP: wordmark left ── */}
        <span className="hidden lg:inline font-heading font-bold text-2xl text-neutral-100 tracking-tight">
          PandaPay
        </span>

        {/* ── DESKTOP: nav links + Shop now right ── */}
        <div className="hidden lg:flex ml-auto items-start gap-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-base text-neutral-300 hover:text-neutral-100 transition-colors leading-tight"
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="#"
            className="font-sans text-sm font-medium text-neutral-100 px-5 py-2 rounded-full border-2 border-primary-500 hover:bg-primary-500/10 transition-colors whitespace-nowrap"
            style={{ boxShadow: '0 0 16px 0 rgba(204,53,0,0.25)' }}
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
        <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">


          <div className="relative flex flex-col h-full px-6 py-6">

            {/* Top row: logo + close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={pandaIcon} alt="PandaPay icon" className="w-8 h-8" />
                <span className="font-heading font-bold text-2xl text-neutral-100 tracking-tight">
                  PandaPay
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-300 hover:text-neutral-100 transition-colors"
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
                  className="font-heading font-bold text-3xl text-neutral-100 hover:text-primary-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Shop now — pinned to bottom */}
            <div className="mt-auto">
              <a
                href="#"
                className="block w-full text-center font-sans text-base font-medium text-neutral-100 py-4 rounded-full border-2 border-primary-500 hover:bg-primary-500/10 transition-colors"
                style={{ boxShadow: '0 0 24px 0 rgba(204,53,0,0.35)' }}
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


