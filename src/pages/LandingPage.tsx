import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import Painpoint from '../components/sections/Painpoint';
import Solution from '../components/sections/Solution';
import BrowseCatalog from '../components/sections/BrowseCatalog';
import MicroStory from '../components/sections/MicroStory';
import Testimonial from '../components/sections/Testimonial';
import FAQ from '../components/sections/FAQ';
import ExploreShop from '../components/sections/ExploreShop';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-grow flex flex-col overflow-x-hidden">
        <Hero />
        <Painpoint />
        <Solution />
        <BrowseCatalog />
        <MicroStory />
        <Testimonial />
        <FAQ />
        <ExploreShop />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
