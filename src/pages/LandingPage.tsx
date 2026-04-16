import React, { Suspense, lazy } from 'react';
import { layoutFullWidth } from '../layoutStyles';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';

const Painpoint = lazy(() => import('../components/sections/Painpoint'));
const Solution = lazy(() => import('../components/sections/Solution'));
const BrowseCatalog = lazy(() => import('../components/sections/BrowseCatalog'));
const MicroStory = lazy(() => import('../components/sections/MicroStory'));
const Testimonial = lazy(() => import('../components/sections/Testimonial'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const ExploreShop = lazy(() => import('../components/sections/ExploreShop'));

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-background" style={layoutFullWidth}>
      <main className="flex min-w-0 w-full flex-1 flex-col items-stretch overflow-x-hidden">
        <Hero />
        <Suspense fallback={null}>
          <Painpoint />
          <Solution />
          <BrowseCatalog />
          <MicroStory />
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
