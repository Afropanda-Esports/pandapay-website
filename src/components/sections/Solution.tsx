import { useTheme } from '../../context/ThemeContext';
import { cardHoverBordered } from '../../cardHover';
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
  { icon: instantDelivery, title: 'Instant Delivery', description: 'No waiting, no guesswork' },
  { icon: multiPayment, title: 'Multi-Payment', description: 'Bank • Crypto • Gift Cards' },
  { icon: regionSmart, title: 'Region Smart', description: 'Matches your account region' },
  { icon: transparentFee, title: 'Transparent Fees', description: 'What you see is what you pay' },
];

const Solution = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section
      id="solution"
      className="w-full min-w-0 border-b border-border py-12 lg:py-20"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 py-12 lg:px-20 lg:py-0">
        <div className="flex w-full min-w-0 flex-col gap-16">
          <FadeReveal className="w-full min-w-0 max-w-4xl">
            <div className="w-full min-w-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                Why it feels easier
              </p>
              <h2 className="mt-5 w-full min-w-0 font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-none text-text-primary">
                Pay with less stress.
              </h2>
              <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-text-muted">
                A simpler flow, clear pricing, and fewer payment dead ends. The product
                should feel calm before it feels clever.
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
                    className={`flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-center ${cardHoverBordered}`}
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
