import React from 'react';
import { ArrowRight, ArrowUpRight, MessageCircleMore } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { layoutFullWidth } from '../../layoutStyles';
import { useTheme } from '../../context/ThemeContext';
import { WHATSAPP_URL } from '../../siteContent';
import logoTextDark from '../../assets/logo/logo-text-dark.png';
import logoTextLight from '../../assets/logo/logo-text-light.png';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const panelY = useTransform(scrollYProgress, [0, 0.18], [0, 36]);
  const { resolvedTheme } = useTheme();
  const avatarStyles = [
    'bg-primary-200',
    'bg-warning-700/70',
    'bg-primary-500',
    'bg-success-500/80',
  ];

  const heroCopy = {
    badge: 'AI-Powered for African Gamers',
    titleTop: 'Your',
    titleMid: 'Gaming',
    titleBottom: 'Store.',
    titleAccentTop: 'On',
    titleAccentBottom: 'WhatsApp.',
    body:
      'Buy gaming gift cards and subscriptions using Naira, USDC, or crypto. No app, no stress — just send a message. Our AI handles everything from product selection to payment confirmation and instant code delivery.',
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full min-w-0 flex-col overflow-hidden"
      style={layoutFullWidth}
    >
      <div
        className="relative z-10 flex w-full min-w-0 flex-1"
        style={layoutFullWidth}
      >
        <div className="grid w-full min-w-0 grid-cols-1 min-h-screen md:grid-cols-2">
          <div
            className="relative flex min-h-[60vh] min-w-0 flex-col px-7 pb-8 pt-[4.5rem] md:min-h-screen md:px-10 md:pb-10 md:pt-[5rem] lg:px-16 lg:pb-14 lg:pt-[5.5rem]"
            style={{ backgroundColor: 'var(--color-hero-left)' }}
          >
            <img
              src={resolvedTheme === 'dark' ? logoTextLight : logoTextDark}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 left-8 w-[min(88%,560px)] opacity-[0.055]"
            />
            <div className="relative z-10 flex h-full min-h-0 flex-col justify-between">
              <div className="flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0 }}
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-primary-500/10 px-5 py-3"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500/50" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500" />
                  </span>
                  <span
                    className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary md:text-[13px]"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {heroCopy.badge}
                  </span>
                </motion.div>

                <div className="flex flex-col gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1
                      className="max-w-[540px] text-[10vw] text-text-primary sm:text-[7.8vw] md:text-5xl lg:text-6xl xl:text-7xl"
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        fontWeight: 800,
                        lineHeight: 0.94,
                        letterSpacing: '-0.03em',
                        overflowWrap: 'normal',
                        wordBreak: 'keep-all',
                        hyphens: 'none',
                      }}
                    >
                      <span className="block">{heroCopy.titleTop}</span>
                      <span className="block">{heroCopy.titleMid}</span>
                      <span className="block">{heroCopy.titleBottom}</span>
                      <span className="mt-2 block text-primary-500 sm:mt-3">{heroCopy.titleAccentTop}</span>
                      <span className="block text-primary-500">{heroCopy.titleAccentBottom}</span>
                    </h1>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-[380px] text-[clamp(1rem,2vw,1.1rem)] leading-[1.7] text-text-secondary"
                    style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300 }}
                  >
                    {heroCopy.body}
                  </motion.p>
                </div>
              </div>

              <div className="flex flex-col gap-10 pt-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <a
                    href={WHATSAPP_URL}
                    className="inline-flex items-center gap-3 rounded-full bg-primary-500 px-6 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-600"
                    aria-label="Start on WhatsApp"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10">
                      <MessageCircleMore size={18} />
                    </span>
                    <span
                      className="text-left text-sm leading-tight md:text-[15px]"
                      style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
                    >
                      Start on
                      <span className="block">WhatsApp</span>
                    </span>
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-3 text-text-secondary transition-colors hover:text-primary-500"
                  >
                    <span
                      className="text-[15px]"
                      style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}
                    >
                      How it works
                    </span>
                    <ArrowRight size={18} />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.65 }}
                  className="mt-auto flex flex-wrap items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {avatarStyles.map((style, index) => (
                      <div
                        key={style}
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-4 ${style}`}
                        style={{ borderColor: 'var(--color-hero-left)' }}
                      >
                        {index === 2 ? (
                          <ArrowUpRight size={16} className="text-white/85" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <p
                    className="text-base text-text-secondary md:text-lg"
                    style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}
                  >
                    <span className="font-medium text-primary-500">+200</span> gamers across
                    Africa
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            style={{ y: panelY, backgroundColor: 'var(--color-hero-right)' }}
            initial={{ opacity: 0, x: 42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 110, damping: 20 }}
            className="relative flex min-h-[50vh] min-w-0 items-center justify-center overflow-hidden px-8 pb-12 pt-24 md:min-h-screen md:px-8"
          >
            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute right-[10%] top-[10%] h-48 w-48 rounded-full bg-primary-500/20 blur-[90px]" />
            <div className="absolute bottom-[8%] left-[6%] h-52 w-52 rounded-full bg-primary-500/14 blur-[90px]" />

            <div className="relative z-10 flex w-full max-w-md flex-col rounded-[34px] border border-white/8 bg-black/15 shadow-[0_24px_90px_-28px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="flex items-center gap-4 border-b border-white/6 bg-black/25 px-6 py-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white">
                  PP
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-[clamp(1.1rem,2vw,1.35rem)] text-white/90"
                    style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
                  >
                    Panda Pay
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-hero-status)' }}
                  >
                    Online — AI active
                  </p>
                </div>
                <div className="ml-auto flex flex-col gap-1.5 opacity-40">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
              </div>

              <div className="flex flex-col gap-6 px-6 py-6 md:px-8 md:py-8">
                <div className="self-start rounded-[24px] bg-black/30 px-6 py-5 text-white/88">
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}>
                    Hey, I want to buy a PSN gift card
                  </p>
                  <span className="mt-2 block text-xs text-white/28">10:42 AM</span>
                </div>

                <div className="self-end rounded-[24px] bg-primary-500 px-6 py-5 text-white">
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}>
                    Got you. Which denomination?
                  </p>
                </div>

                <div className="self-end rounded-[26px] bg-black/18 p-5">
                  <div className="rounded-[22px] border border-primary-500/35 bg-black/22 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-info-500 text-2xl font-bold text-white">
                        PS
                      </div>
                      <div>
                        <p
                          className="text-xl text-white/90"
                          style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
                        >
                          PSN Gift Card $50
                        </p>
                        <p
                          className="mt-1 text-[1.35rem] text-primary-400"
                          style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
                        >
                          ₦80,000
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 block text-right text-xs text-white/28">10:42 AM</span>
                </div>

                <div className="self-start rounded-[24px] bg-black/30 px-6 py-5 text-white/88">
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400 }}>
                    Yes, the $50 one. How do I pay?
                  </p>
                  <span className="mt-2 block text-xs text-white/28">10:43 AM</span>
                </div>

                <div className="self-end rounded-[24px] bg-primary-500 px-6 py-5 text-white">
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}>
                    Pick your payment method:
                  </p>
                </div>

                <div className="self-end flex flex-wrap gap-3">
                  <span className="rounded-full border border-success-500/40 bg-success-500/18 px-4 py-2 text-sm text-success-300">
                    Naira Transfer
                  </span>
                  <span className="rounded-full border border-info-500/40 bg-info-500/18 px-4 py-2 text-sm text-blue-200">
                    USDC
                  </span>
                  <span className="rounded-full border border-primary-400/40 bg-primary-500/18 px-4 py-2 text-sm text-primary-200">
                    cNGN
                  </span>
                </div>

                <div className="mt-2 self-start rounded-full bg-black/24 px-6 py-4">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-3 w-3 rounded-full bg-white/45"
                        animate={{ y: [0, -4, 0], opacity: [0.55, 1, 0.55] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: dot * 0.16,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
