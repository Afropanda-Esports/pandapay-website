import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import SeoMeta from '../components/SeoMeta';
import FadeReveal from '../components/FadeReveal';
import { WHATSAPP_URL } from '../siteContent';

const sections = [
  {
    title: 'The Problem',
    body:
      'Buying airtime, data, and paying bills in Nigeria still means juggling apps, USSD codes, and clunky checkouts. The everyday top-up was overdue for something simpler.',
  },
  {
    title: 'Our Solution',
    body:
      'A WhatsApp-native AI that handles the entire purchase flow. Pay by Naira bank transfer from any Nigerian bank — built around how Nigerians already transact.',
  },
  {
    title: 'The Stack',
    body:
      'AI-powered. Naira-first. Built on Anthropic Claude, with bank-transfer verification designed for fast, reliable checkout.',
  },
  {
    title: 'Team',
    body:
      'Team details will be added here as PandaPay grows. For now, the mission is clear: remove payment friction for everyday top-ups and bills in Nigeria.',
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="About Panda Pay — VTU & Bills on WhatsApp"
        description="Learn why PandaPay exists, the payment friction it removes for everyday top-ups and bills in Nigeria, and how its WhatsApp-native AI checkout works."
        path="/about"
      />
      <PageHero
        title="We built the simplest way to top up in Nigeria."
        body="Airtime, data, electricity, and cable TV shouldn't need an app or a USSD maze. PandaPay makes it a WhatsApp message."
      />

      <main className="pb-20">
        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto grid w-full min-w-0 max-w-[1440px] gap-5 px-6 md:px-12 lg:grid-cols-2 lg:px-20">
            {sections.map((section, index) => (
              <FadeReveal key={section.title} className="w-full min-w-0" delay={index * 0.05}>
                <article className="h-full rounded-[32px] bg-[var(--color-card-soft)] p-8 shadow-elevation-2">
                  <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#120B04] dark:text-[rgb(225,225,227)]">
                    {section.title}
                  </h2>
                  <p className="mt-4 font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)]">
                    {section.body}
                  </p>
                </article>
              </FadeReveal>
            ))}
          </div>
        </section>

        <section className="w-full min-w-0 py-12 shadow-[var(--shadow-section-separate)] lg:py-20">
          <div className="mx-auto flex w-full min-w-0 max-w-[1440px] justify-center px-6 md:px-12 lg:px-20">
            <a
              href={WHATSAPP_URL}
              className="inline-flex rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Try PandaPay
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
