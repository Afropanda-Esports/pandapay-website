import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  ListChecks,
  MessageCircle,
  PackageSearch,
  ShoppingCart,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { sectionTitleOnDark } from '../../typography';
import FadeReveal from '../FadeReveal';
import { PURCHASE_FLOW_STEPS, WHATSAPP_URL } from '../../siteContent';

const flowIcons: LucideIcon[] = [
  MessageCircle,
  PackageSearch,
  ListChecks,
  ShoppingCart,
  CreditCard,
  BadgeCheck,
];

const flowSteps = PURCHASE_FLOW_STEPS.map((step, index) => ({
  ...step,
  icon: flowIcons[index] ?? MessageCircle,
}));

type FlowStep = (typeof flowSteps)[number];

function FlowPhone({ activeStep }: { activeStep: number }) {
  const scene = flowSteps[activeStep]?.chat ?? flowSteps[0].chat;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[320px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary-500/25 via-primary-500/5 to-transparent blur-2xl"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="relative rounded-[2rem] p-[3px]"
        style={{
          background:
            'linear-gradient(145deg, rgba(255,107,1,0.55), rgba(255,107,1,0.2), rgba(255,107,1,0.35))',
        }}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        <div className="overflow-hidden rounded-[1.85rem] bg-[#e5ddd5] shadow-2xl dark:bg-[#0b141a]">
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white dark:bg-[#1f2c34]">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <MessageCircle size={18} aria-hidden />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Pandapay</p>
              <p className="text-[11px] text-white/70">Full purchase flow</p>
            </div>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold tabular-nums">
              {String(activeStep + 1).padStart(2, '0')}/{String(flowSteps.length).padStart(2, '0')}
            </span>
          </div>

          <motion.div
            className="relative min-h-[220px] px-3 py-4 sm:min-h-[240px]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/svg%3E")',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="flex flex-col gap-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {scene.map((bubble, i) => {
                  const isUser = bubble.role === 'user';
                  return (
                    <motion.div
                      key={`${activeStep}-${i}`}
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                        isUser
                          ? 'self-start rounded-tl-sm bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-white'
                          : bubble.highlight
                            ? 'self-end rounded-tr-sm bg-primary-500 font-semibold text-white'
                            : 'self-end rounded-tr-sm bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white'
                      }`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      {bubble.text}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepCard({
  step,
  index,
  isActive,
  isPast,
  onVisible,
}: {
  step: FlowStep;
  index: number;
  isActive: boolean;
  isPast: boolean;
  onVisible: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const Icon = step.icon;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(index);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <article
      ref={ref}
      className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 md:p-6 ${
        isActive
          ? 'bg-[var(--color-card-soft)] shadow-elevation-3 ring-1 ring-primary-500/25'
          : isPast
            ? 'bg-[var(--color-card-soft)]/60 opacity-80'
            : 'bg-[var(--color-card-soft)]/40'
      }`}
    >
      <span
        className="pointer-events-none absolute -right-2 -top-4 font-heading text-7xl font-bold leading-none text-primary-500/[0.07] md:text-8xl"
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex gap-4">
        <motion.div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isActive
              ? 'bg-primary-500 text-white shadow-[0_4px_14px_-2px_rgba(255,107,1,0.45)]'
              : 'bg-primary-500/10 text-primary-500'
          }`}
          animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={20} strokeWidth={2} aria-hidden />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
              {step.label}
            </span>
            <span className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-500">
              {step.tag}
            </span>
          </div>
          <h3 className="font-heading text-lg font-bold leading-snug text-text-primary md:text-xl">
            {step.title}
          </h3>
          <p className="mt-2 font-sans text-sm leading-7 text-text-muted md:text-[15px]">
            {step.note}
          </p>
        </div>
      </div>

      {isActive ? (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"
          layoutId="flow-active-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      ) : null}
    </article>
  );
}

export default function HowItWorksDeepDive() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative w-full min-w-0 overflow-hidden py-16 shadow-[var(--shadow-section-separate)] lg:py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-primary-500/8 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-20">
        <FadeReveal className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
            Full flow
          </p>
          <h2 className={`mt-4 ${sectionTitleOnDark}`}>From catalog to confirmation in one chat.</h2>
          <p className="mt-4 max-w-2xl font-sans text-base leading-8 text-text-muted">
            Follow the guided purchase journey and keep each order update in the same WhatsApp
            conversation.
          </p>
        </FadeReveal>

        {/* Mobile: phone on top */}
        <div className="mt-10 lg:hidden">
          <FlowPhone activeStep={activeStep} />
          <div className="mt-6 flex justify-center gap-1.5">
            {flowSteps.map((_, i) => (
              <button
                key={flowSteps[i].label}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeStep ? 'w-6 bg-primary-500' : 'w-1.5 bg-primary-500/25'
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-16 xl:grid-cols-[360px_1fr]">
          {/* Desktop sticky phone */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FlowPhone activeStep={activeStep} />
              <div className="mt-8 flex flex-col gap-2">
                {flowSteps.map((step, i) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      i === activeStep
                        ? 'bg-primary-500/10 font-medium text-primary-500'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        i === activeStep
                          ? 'bg-primary-500 text-white'
                          : i < activeStep
                            ? 'bg-primary-500/20 text-primary-500'
                            : 'bg-black/5 dark:bg-white/8'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="truncate">{step.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Steps + progress rail */}
          <div className="relative min-w-0">
            <div
              className="absolute bottom-4 left-[22px] top-4 hidden w-px bg-primary-500/15 lg:block"
              aria-hidden
            >
              <motion.div
                className="w-full origin-top bg-gradient-to-b from-primary-500 to-primary-400"
                animate={{ height: `${(activeStep / Math.max(flowSteps.length - 1, 1)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              {flowSteps.map((step, index) => (
                <StepCard
                  key={step.label}
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  isPast={activeStep > index}
                  onVisible={setActiveStep}
                />
              ))}
            </div>
          </div>
        </div>

        <FadeReveal className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" delay={0.1}>
          <a
            href={WHATSAPP_URL}
            className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-4px_rgba(255,107,1,0.45)] transition-all hover:bg-primary-600"
          >
            Try it on WhatsApp
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <p className="text-center text-sm text-text-muted sm:text-left">
            {flowSteps.length} steps · one thread · zero app downloads
          </p>
        </FadeReveal>
      </div>
    </section>
  );
}
