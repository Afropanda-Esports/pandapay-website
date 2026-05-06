import { useTheme } from '../../context/ThemeContext';
import { cardHoverShadow } from '../../cardHover';
import FadeReveal from '../FadeReveal';
import desktopSvg from '../../assets/desktop.svg';
import desktopLightSvg from '../../assets/desktop-light.svg';
import wrapperSvg from '../../assets/Wrapper.svg';
import wrapperLightSvg from '../../assets/Wrapper-light.svg';
import instantDelivery from '../../assets/solution-icons/instant-delivery.svg';
import multiPayment from '../../assets/solution-icons/multi-payment.svg';
import regionSmart from '../../assets/solution-icons/region-smart.svg';
import transparentFee from '../../assets/solution-icons/transparent-fee.svg';

const features = [
  { icon: instantDelivery, title: 'Understands plain language', description: 'Type in English or Pidgin. Panda Pay AI gets it instantly.' },
  { icon: multiPayment, title: '2-second confirmation', description: 'Upload a receipt and AI confirms payment in under 2 seconds.' },
  { icon: regionSmart, title: 'Live naira prices', description: 'NGN prices update with exchange rates. No surprises.' },
  { icon: transparentFee, title: 'Automatic fraud protection', description: 'Every transaction is checked before delivery.' },
];

const Solution = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section
      id="solution"
      className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 py-12 lg:px-20 lg:py-0">
        <div className="flex w-full min-w-0 flex-col gap-16">
          <FadeReveal className="w-full min-w-0 max-w-4xl">
            <div className="w-full min-w-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                AI advantage
              </p>
              <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-none text-text-primary">
                Powered by AI. Built for African gamers.
              </h2>
              <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-text-muted">
                Panda Pay AI handles shopping, payment confirmation, live pricing, fraud
                checks, support, and stock updates inside WhatsApp.
              </p>
            </div>
          </FadeReveal>

          <FadeReveal className="hidden w-full justify-center lg:flex" delay={0.08}>
            <img
              src={resolvedTheme === 'dark' ? desktopSvg : desktopLightSvg}
              alt="PandaPay solution overview"
              className="h-auto w-full"
            />
          </FadeReveal>

          <FadeReveal className="w-full min-w-0 lg:hidden" delay={0.08}>
            <div className="flex w-full min-w-0 flex-col items-stretch gap-6">
              <img
                src={resolvedTheme === 'dark' ? wrapperSvg : wrapperLightSvg}
                alt="PandaPay solution overview"
                className="h-auto w-full"
              />

              <div className="flex w-full min-w-0 flex-col gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex flex-col items-center gap-3 rounded-2xl bg-[var(--color-card-soft)] p-5 text-center shadow-elevation-2 ${cardHoverShadow}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-raised">
                      <img src={feature.icon} alt={feature.title} className="h-6 w-6" />
                    </div>
                    <p className="font-sans text-sm font-bold text-text-primary">{feature.title}</p>
                    <p className="font-sans text-xs text-text-muted">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
};

export default Solution;
