import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { sectionTitle } from '../../typography';
import FadeReveal from '../FadeReveal';

type ChatTestimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  time: string;
  bubble: string;
  align: 'left' | 'right';
};

const testimonials: ChatTestimonial[] = [
  {
    id: 'tunde',
    quote: 'I wanted a quick gaming top-up without leaving WhatsApp. PandaPay made the whole thing feel simple.',
    author: 'Tunde',
    location: 'Lagos',
    time: '10:42 AM',
    bubble: 'bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-white',
    align: 'left',
  },
  {
    id: 'alex',
    quote: 'Paying with USDC felt clean. I sent the exact amount and my code arrived without extra back-and-forth.',
    author: 'Alex',
    location: 'Abuja',
    time: '11:08 AM',
    bubble: 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white',
    align: 'right',
  },
  {
    id: 'kemi',
    quote: 'The AI actually understands natural chat. I just said what I wanted and it handled the rest.',
    author: 'Kemi',
    location: 'Port Harcourt',
    time: '2:15 PM',
    bubble: 'bg-[#dcf8c6] text-neutral-900 dark:bg-[#005c4b] dark:text-white',
    align: 'left',
  },
  {
    id: 'ada',
    quote: 'Got my PSN card in under five minutes. No forms, no stress.',
    author: 'Ada',
    location: 'Accra',
    time: '6:31 PM',
    bubble: 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white',
    align: 'right',
  },
];

const stats = [
  { value: '5,000+', label: 'Gamers served' },
  { value: '<2 min', label: 'Avg. delivery' },
  { value: '24/7', label: 'AI on WhatsApp' },
];

function ChatBubble({ item }: { item: ChatTestimonial }) {
  const isLeft = item.align === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`relative max-w-[min(100%,340px)] rounded-2xl px-4 py-3 sm:max-w-[380px] sm:px-5 sm:py-4 ${
          isLeft ? 'rounded-tl-sm' : 'rounded-tr-sm'
        } ${item.bubble}`}
      >
        <p className="font-sans text-[15px] leading-relaxed sm:text-base">“{item.quote}”</p>
        <div
          className={`mt-3 flex items-center gap-2 text-xs opacity-70 ${isLeft ? '' : 'justify-end'}`}
        >
          <span className="font-semibold">
            {item.author} · {item.location}
          </span>
          <span aria-hidden>·</span>
          <time>{item.time}</time>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-background py-16 shadow-[var(--shadow-section-separate)] lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary-500/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <FadeReveal className="min-w-0">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Real chats
            </p>
            <h2 className={`mt-4 ${sectionTitle}`}>
              Gamers don&apos;t leave reviews. They leave messages.
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-8 text-text-muted">
              Every purchase ends in WhatsApp — so the best proof is how people talk after they
              get their code.
            </p>

            <ul className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-2xl bg-surface px-3 py-4 text-center shadow-elevation-2"
                >
                  <p className="font-heading text-lg font-bold text-primary-500 sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-wider text-text-muted sm:text-xs">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    index === activeIndex
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-[var(--color-card-soft)] text-text-muted hover:text-text-primary'
                  }`}
                >
                  {item.author}
                </button>
              ))}
            </div>
          </FadeReveal>

          <FadeReveal delay={0.1} className="min-w-0">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:ml-auto">
              <motion.div
                className="rounded-[2.5rem] border-[10px] border-neutral-900 bg-neutral-900 p-2 shadow-2xl dark:border-neutral-700"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="overflow-hidden rounded-[1.75rem] bg-[#e5ddd5] dark:bg-[#0b141a]">
                  <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white dark:bg-[#1f2c34]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500">
                      <MessageCircle size={20} aria-hidden />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">Panda Pay</p>
                      <p className="text-xs text-white/80">online</p>
                    </div>
                  </div>

                  <div className="relative min-h-[320px] px-3 py-5 sm:min-h-[360px] sm:px-4">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                      }}
                      aria-hidden
                    />
                    <AnimatePresence mode="wait">
                      <ChatBubble key={active.id} item={active} />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -right-2 top-8 hidden rounded-2xl bg-testimonial-2 px-4 py-3 shadow-elevation-3 sm:block lg:-right-8"
              >
                <p className="font-heading text-sm font-bold text-neutral-900">Instant delivery</p>
                <p className="text-xs text-neutral-700">Codes in-chat</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="absolute -left-2 bottom-12 hidden rounded-2xl bg-testimonial-1 px-4 py-3 shadow-elevation-3 sm:block lg:-left-10"
              >
                <p className="font-heading text-sm font-bold text-neutral-900">Naira & USDC</p>
                <p className="text-xs text-neutral-800">Your rails, your choice</p>
              </motion.div>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
}
