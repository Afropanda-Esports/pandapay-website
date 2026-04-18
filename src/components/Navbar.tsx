import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import iconDark from '../assets/logo/icon-dark.png';
import iconLight from '../assets/logo/icon-light.png';
import logoTextDark from '../assets/logo/logo-text-dark.png';
import logoTextLight from '../assets/logo/logo-text-light.png';
import hamburgerIconDark from '../assets/hamburger-icon.svg';
import hamburgerIconLight from '../assets/hamurger-icon-light.svg';
import ThemeToggle from './ThemeToggle';
import { primaryOutlinePill } from '../cardHover';

const NAV_LINKS = [
  { label: 'About', href: '#solution' },
  { label: 'Games', href: '#explore-shop' },
  { label: 'Blog', href: '#faq' },
  { label: 'Community', href: '#explore-shop' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const icon = resolvedTheme === 'dark' ? iconDark : iconLight;
  const logoText = resolvedTheme === 'dark' ? logoTextDark : logoTextLight;
  const hamburgerIcon =
    resolvedTheme === 'dark' ? hamburgerIconDark : hamburgerIconLight;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="relative flex h-20 w-full min-w-0 items-start px-6 pt-6 md:px-12 lg:h-24 lg:px-20">
        <img
          src={icon}
          alt="PandaPay icon"
          className="absolute left-1/2 top-6 hidden h-10 w-10 -translate-x-1/2 lg:block"
        />

        <div className="flex items-center lg:hidden">
          <img src={logoText} alt="PandaPay" className="h-12" />
        </div>

        <img src={logoText} alt="PandaPay" className="hidden h-12 lg:inline" />

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-2 py-1 font-sans text-base leading-tight text-text-secondary transition-colors hover:bg-primary-500/10 hover:text-primary-500"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          <a
            href="#explore-shop"
            className={`whitespace-nowrap rounded-full px-5 py-2 font-sans text-sm font-medium text-text-primary transition-colors hover:bg-primary-500/10 ${primaryOutlinePill}`}
          >
            Shop now
          </a>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto p-1 lg:hidden"
          aria-label="Open menu"
        >
          <img src={hamburgerIcon} alt="" className="h-7 w-7" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen &&
          createPortal(
            <motion.div
              className="fixed inset-0 z-50 flex flex-col"
              style={{ backgroundColor: 'var(--color-nav-bg)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <motion.div
                className="relative flex h-full flex-col px-6 py-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between">
                  <img src={logoText} alt="PandaPay" className="h-6" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-text-secondary transition-colors hover:text-text-primary"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                <nav className="mt-16 flex flex-col gap-8">
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-heading text-3xl font-bold text-text-primary transition-colors hover:text-primary-400"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{ duration: 0.24, delay: index * 0.04 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                  <ThemeToggle dropDirection="up" />
                  <a
                    href="#explore-shop"
                    className={`block w-full rounded-full py-4 text-center font-sans text-base font-medium text-text-primary transition-colors hover:bg-primary-500/10 ${primaryOutlinePill}`}
                  >
                    Shop now
                  </a>
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
