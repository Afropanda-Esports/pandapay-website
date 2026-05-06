import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SeoMeta from "../components/SeoMeta";
import FAQ from "../components/sections/FAQ";
import { WHATSAPP_URL } from "../siteContent";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Frequently Asked Questions"
        description="Got questions about Panda Pay? Find answers about payments, delivery, crypto, and more."
        path="/faq"
      />
      <Navbar />
      <main className="pt-6">
        <section className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <h1 className="font-heading text-5xl font-bold text-text-primary">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-3xl leading-8 text-text-muted">
            Panda Pay AI handles your full purchase flow on WhatsApp, so answers stay fast and clear.
          </p>
          <a href={WHATSAPP_URL} className="mt-6 inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white" aria-label="Message Panda Pay on WhatsApp">
            Message us on WhatsApp
          </a>
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
