import { ctaTitle } from '../../typography';
import FadeReveal from '../FadeReveal';
import { WHATSAPP_URL } from '../../siteContent';

export default function ShopCta() {
  return (
    <section className="w-full min-w-0 bg-background py-16 lg:py-20">
      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-20">
        <FadeReveal>
          <div className="rounded-3xl bg-[var(--color-card-soft)] p-8 text-center shadow-elevation-2 md:p-12">
            <h3 className={ctaTitle}>
              Ready to top up in seconds?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">
              Message Panda Pay on WhatsApp and get your airtime, data, or bill payment sorted in minutes.
            </p>
            <a
              href={WHATSAPP_URL}
              className="mt-6 inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              aria-label="Start on WhatsApp"
            >
              Start on WhatsApp
            </a>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
