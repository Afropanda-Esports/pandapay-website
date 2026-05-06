import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cardHoverShadow } from '../../cardHover';
import FadeReveal from '../FadeReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What can I buy on PandaPay today?',
    answer:
      'Right now, PandaPay supports PlayStation gift cards and PS Plus. More gaming products are being added as the catalog expands.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Most codes are delivered within 2 minutes of payment confirmation. Bank transfers may take up to 30 minutes during busy periods.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Naira bank transfer, cNGN stablecoin, and USDC across multiple supported chains.',
  },
  {
    question: 'What exactly does the AI do?',
    answer:
      'Panda Pay AI handles the entire purchase flow on WhatsApp: natural language shopping, live NGN pricing, payment confirmation, fraud checks, delivery, and 24/7 support.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="w-full min-w-0 py-16 shadow-[var(--shadow-section-separate)] lg:py-24">
      <div className="mx-auto grid w-full min-w-0 max-w-[1440px] grid-cols-1 gap-14 px-4 lg:grid-cols-[minmax(340px,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-20">
        <FadeReveal className="w-full min-w-0">
          <div className="flex w-full min-w-0 flex-col gap-5">
            <p className="w-full min-w-0 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              FAQ
            </p>
            <h2 className="w-full min-w-0 font-heading text-4xl font-bold leading-tight text-text-primary md:text-5xl">
              Frequently asked questions.
            </h2>
            <p className="w-full min-w-0 max-w-xl font-sans text-base leading-8 text-text-muted">
              A simpler product needs simpler explanations. These are the core questions
              users should be able to answer at a glance.
            </p>
          </div>
        </FadeReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <FadeReveal key={faq.question} className="min-w-0 w-full" delay={index * 0.06}>
              <div
                className={`rounded-3xl bg-[var(--color-card-soft)] px-5 py-4 shadow-elevation-2 ${cardHoverShadow}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="font-sans text-base font-medium text-text-primary md:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    className="mt-1 shrink-0 text-text-muted"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    >
                      <p className="pt-4 pr-8 font-sans text-sm leading-7 text-text-muted md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
