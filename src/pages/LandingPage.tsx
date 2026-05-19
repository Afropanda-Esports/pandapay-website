import React, { Suspense, lazy } from 'react';
import { layoutFullWidth } from '../layoutStyles';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Inventory from '../components/sections/Inventory';
import SeoMeta from '../components/SeoMeta';

const HowItWorksDeepDive = lazy(() => import('../components/sections/HowItWorksDeepDive'));
const Testimonial = lazy(() => import('../components/sections/Testimonial'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const ShopCta = lazy(() => import('../components/sections/ShopCta'));

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-background" style={layoutFullWidth}>
      <SeoMeta
        title="Panda Pay — Buy Gaming Gift Cards on WhatsApp | Nigeria & Ghana"
        description="Buy gaming gift cards and subscriptions on WhatsApp using Naira, USDC, or crypto. PandaPay handles pricing, payment confirmation, and instant code delivery."
        path="/"
      />
      <Navbar />
      <main className="flex min-w-0 w-full flex-1 flex-col items-stretch overflow-x-hidden pt-16 lg:pt-20">
        <Hero />
        <Inventory />
        <Suspense fallback={null}>
          <HowItWorksDeepDive />
          <Testimonial />
          <FAQ />
          <ShopCta />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
