import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import heroBg from '../../assets/hero-bg.png';
import spinSvg from '../../assets/spin.svg';
import Navbar from '../Navbar';
import Marquee from './Marquee';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col border-b border-border overflow-hidden">

            {/* Background image — behind everything including the navbar */}
            <img
                src={heroBg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />


            {/* Dark overlay so content stays readable */}
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-overlay)' }} />

            {/* Navbar — normal flow at the top, background bleeds behind it */}
            <div className="relative z-10">
                <Navbar />
            </div>

            {/* Hero content — fills the remaining space below the nav */}
            <div className="relative z-10 flex-1 flex items-start justify-start pt-10 px-6 md:px-12 lg:px-20">

                {/* Spinning decorative element — anchored to top-right of the content area, below the nav */}
                <img
                    src={spinSvg}
                    alt=""
                    aria-hidden="true"
                    className="hidden lg:block absolute top-0 right-12 w-25 animate-spin [animation-duration:12s]"
                />
                <div className="mx-auto max-w-360 w-full flex flex-col items-start gap-60 md:gap-80">

                    {/* Heading */}
                    <h1
                        className="font-heading font-bold text-text-primary text-left max-w-[693px] w-full"
                        style={{ fontSize: 'clamp(2rem, 5vw, 64px)', lineHeight: '130%' }}
                    >
                        Paying for your favorite{' '}
                        <em className="text-primary-500 italic font-bold">games</em>{' '}
                        shouldn't feel like a boss fight.
                    </h1>

                    {/* Bottom row: social proof left, copy + CTA right */}
                    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">

                        {/* Left: avatar stack + count + label */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                {/* Overlapping avatar placeholders */}
                                <div className="flex -space-x-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-background bg-surface-raised"
                                        />
                                    ))}
                                </div>
                                <span className="font-heading font-bold text-primary-500 text-4xl">+5000</span>
                            </div>
                            <p className="font-sans text-sm text-text-muted">
                                • gamers powered by seamless payments.
                            </p>
                        </div>

                        {/* Right: copy + CTA */}
                        <div className="flex flex-col gap-6 flex-1 ">
                            <p className="font-sans text-sm text-text-secondary leading-relaxed">
                                Gamers shouldn't struggle to renew PlayStation, Xbox, or FIFA passes or
                                juggle multiple cards and currencies. PandaPay makes it seamless to pay
                                with bank transfers, crypto, and gift cards instantly.
                            </p>

                            {/* Explore catalog CTA */}
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 transition-colors rounded-full pl-5 pr-1 py-1 self-start"
                            >
                                <span className="font-sans font-semibold text-white text-sm">
                                    Explore our catalog
                                </span>
                                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <ArrowUpRight size={15} className="text-primary-500" />
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Slanted Marquee — sits at the bottom of the hero, sharing its background */}
            <div className="relative z-10 w-full mt-auto mb-10 overflow-hidden">
                <Marquee />
            </div>

        </section>
    );
};

export default Hero;
