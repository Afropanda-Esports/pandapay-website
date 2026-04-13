import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What payment methods does PandaPay support?',
      answer: 'PandaPay supports various payment methods including credit cards, debit cards, PayPal, and cryptocurrency payments.',
    },
    {
      question: 'How long does payment confirmation take?',
      answer: 'Payment confirmations are typically instant. In some cases, it may take up to 5 minutes depending on your payment method.',
    },
    {
      question: 'When will I receive my game code or credit?',
      answer: 'Game codes and credits are delivered immediately after payment confirmation to your registered email address.',
    },
    {
      question: 'Is PandaPay secure?',
      answer: 'Yes, PandaPay uses industry-standard encryption and security measures to protect your payment information and personal data.',
    },
    {
      question: 'Can I pay in my local currency?',
      answer: 'Yes, PandaPay supports multiple currencies. Your payment will be automatically converted to your local currency at checkout.',
    },
    {
      question: 'Is there a Panda Pay mobile app?',
      answer: 'Yes, PandaPay is available on both iOS and Android. Download it from the App Store or Google Play Store.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="min-h-screen flex items-center justify-center border-b border-border py-10">
      <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Heading */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-heading text-4xl font-bold text-text-primary leading-tight">
              WHAT.<br />
              THE.<br />
              FREQUENTLY ASKED.<br />
              QUESTIONS.
            </h2>
          </motion.div>

          {/* Right: FAQ Items */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-border pb-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <span className="font-sans text-base md:text-lg text-text-secondary group-hover:text-text-primary transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    className="text-text-muted flex-shrink-0 mt-1"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openIndex === index ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="mt-4 pr-8">
                        <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
