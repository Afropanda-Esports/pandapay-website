import React, { Suspense, lazy } from 'react';
import { layoutFullWidth } from '../layoutStyles';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import SeoMeta from '../components/SeoMeta';

const Painpoint = lazy(() => import('../components/sections/Painpoint'));
const MicroStory = lazy(() => import('../components/sections/MicroStory'));
const HowItWorksDeepDive = lazy(() => import('../components/sections/HowItWorksDeepDive'));
const CryptoShowcase = lazy(() => import('../components/sections/CryptoShowcase'));
const WhyPandaPay = lazy(() => import('../components/sections/WhyPandaPay'));
const Solution = lazy(() => import('../components/sections/Solution'));
const AboutStory = lazy(() => import('../components/sections/AboutStory'));
const Testimonial = lazy(() => import('../components/sections/Testimonial'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const ExploreShop = lazy(() => import('../components/sections/ExploreShop'));

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-background" style={layoutFullWidth}>
      <SeoMeta
        title="Panda Pay — Buy Gaming Gift Cards on WhatsApp | Nigeria & Ghana"
        description="Buy gaming gift cards and subscriptions on WhatsApp using Naira, USDC, or crypto. PandaPay handles pricing, payment confirmation, and instant code delivery."
        path="/"
      />
      <Navbar />
      <main className="pt-16 flex min-w-0 w-full flex-1 flex-col items-stretch overflow-x-hidden lg:pt-20">
        <Hero />
        <Suspense fallback={null}>
          <Painpoint />
          <HowItWorksDeepDive />
          <MicroStory />
          <CryptoShowcase />
          <WhyPandaPay />
          <Solution />
          <AboutStory />
          <Testimonial />
          <FAQ />
          <ExploreShop />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
