import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { layoutFullWidth } from '../../layoutStyles';
import Navbar from '../Navbar';
import FadeReveal from '../FadeReveal';
import { useTheme } from '../../context/ThemeContext';

const Hero: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const avatarStyles = [
    'from-[#ffe7d9] to-[#fff4ec]',
    'from-[#e4f3ef] to-[#f5fbf8]',
    'from-[#f6e3dc] to-[#fff3ef]',
    'from-[#efe9ff] to-[#faf7ff]',
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[68vh] w-full min-w-0 flex-col overflow-hidden lg:min-h-[76vh]"
      style={layoutFullWidth}
    >
      <div
        className={
          resolvedTheme === 'dark'
            ? 'absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(204,53,0,0.22),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(39,165,137,0.14),_transparent_20%),linear-gradient(180deg,_rgba(8,8,8,0.92)_0%,_rgba(10,10,10,0.98)_100%)]'
            : 'absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(204,53,0,0.16),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(39,165,137,0.12),_transparent_18%),linear-gradient(180deg,_#fff8f3_0%,_#f6f4ef_55%,_#eef4ef_100%)]'
        }
      />
      <div
        className={
          resolvedTheme === 'dark'
            ? 'absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]'
            : 'absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(10,10,10,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.12)_1px,transparent_1px)] [background-size:64px_64px]'
        }
      />
      <div className="absolute left-[6%] top-[18%] h-24 w-24 rounded-full bg-primary-500/12 blur-3xl" />
      <div className="absolute right-[12%] top-[20%] h-32 w-32 rounded-full bg-secondary-500/10 blur-3xl" />
      <div className="absolute bottom-[16%] left-[40%] h-28 w-28 rounded-full bg-white/[0.02] blur-2xl" />

      <div className="relative z-10 w-full min-w-0">
        <Navbar />
      </div>

      <div
        className="relative z-10 flex w-full min-w-0 flex-1 items-start justify-start px-6 pt-10 md:px-12 lg:px-20"
        style={layoutFullWidth}
      >
        <div className="absolute top-0 right-12 hidden h-20 w-20 rounded-full bg-primary-500/8 lg:block animate-spin [animation-duration:18s]">
          <div className="absolute inset-[10px] rounded-full bg-primary-500/10" />
        </div>
        <div
          className="mx-auto flex w-full min-w-0 max-w-[1280px] flex-col items-stretch gap-10 md:gap-12"
          style={layoutFullWidth}
        >
          <FadeReveal className="w-full min-w-0 max-w-4xl">
            <div className="w-full min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-6 inline-flex self-start rounded-full bg-background/50 px-4 py-2"
              >
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                  Fast checkout for gamers
                </span>
              </motion.div>
              <h1
                className="w-full min-w-0 max-w-[760px] text-left font-heading font-bold text-text-primary"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', lineHeight: '108%' }}
              >
                Buy game credits, passes, and gift cards without the payment drama.
              </h1>
            </div>
          </FadeReveal>

          <FadeReveal className="w-full min-w-0 max-w-3xl" delay={0.08}>
            <div className="w-full min-w-0">
              <p className="w-full min-w-0 font-sans text-base leading-8 text-text-secondary">
                PandaPay makes regional purchases feel simple again. Pay with bank
                transfer, crypto, or gift cards, see exactly what to send, and get
                your delivery fast.
              </p>
            </div>
          </FadeReveal>

          <FadeReveal className="mb-10 w-full min-w-0" delay={0.14}>
            <div className="flex w-full min-w-0 flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatarStyles.map((style) => (
                    <div
                      key={style}
                      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${style} shadow-sm ring-2 ${
                        resolvedTheme === 'dark' ? 'ring-neutral-950' : 'ring-white'
                      }`}
                    >
                      <div className="absolute top-[8px] h-3.5 w-3.5 rounded-full bg-white/95" />
                      <div className="absolute bottom-[5px] h-4.5 w-6 rounded-t-full bg-white/95" />
                    </div>
                  ))}
                </div>
                <span className="font-heading text-4xl font-bold text-primary-500">+5000</span>
              </div>
              <p className="font-sans text-sm text-text-muted">
                Gamers already using PandaPay across Africa.
              </p>
            </div>

            <a
              href="#explore-shop"
              className="inline-flex self-start rounded-full bg-primary-500 pl-5 pr-1 py-1 text-white transition-colors hover:bg-primary-600 md:self-auto"
            >
              <span className="inline-flex items-center gap-2">
                <span className="font-sans text-sm font-semibold">
                  Explore our catalog
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                  <ArrowUpRight size={15} className="text-primary-500" />
                </span>
              </span>
            </a>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
