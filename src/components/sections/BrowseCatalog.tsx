import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FadeReveal from '../FadeReveal';

// Use import.meta.glob to dynamically import all images in the browse folder
// const images = import.meta.glob('../../assets/browse/*.png', { eager: true, import: 'default' });
// const imagePaths = Object.values(images) as string[];

const BrowseCatalog: React.FC = () => {
    return (
        <section id="browse-catalog" className="w-full min-w-0 border-b border-border bg-background py-12 lg:py-20">
            <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 py-12 lg:px-20 lg:py-0">
                <FadeReveal className="mb-12 w-full min-w-0">
                    <div className="flex w-full min-w-0 flex-col items-stretch justify-between gap-12 lg:flex-row lg:items-start">
                    <h2 className="w-full min-w-0 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
                        Your favorite <span className="text-primary-500">platforms,</span><br /> unlocked!
                    </h2>

                    <div className="flex w-full min-w-0 max-w-[320px] shrink-0 flex-col items-stretch gap-6 lg:items-end lg:pt-2">
                        <p className="w-full min-w-0 font-sans text-sm leading-8 text-text-muted md:text-base lg:text-right">
                            Browse over 100 digital products with cleaner pricing and a
                            checkout flow that feels easier to trust.
                        </p>
                        <a
                            href="#explore-shop"
                            className="inline-flex items-center gap-3 self-start rounded-full bg-white pl-5 pr-1.5 py-1.5 transition-colors hover:bg-neutral-200 lg:self-auto"
                        >
                            <span className="font-sans text-sm font-semibold text-neutral-900">
                                Browse catalog
                            </span>
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface">
                                <ArrowUpRight size={16} className="text-white" />
                            </span>
                        </a>
                    </div>
                    </div>
                </FadeReveal>

                {/* Animated Horizontal Card Carousel */}
                {/* <div 
                    className="w-full overflow-hidden relative"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}
                >
                    <div className="flex w-fit whitespace-nowrap gap-6 md:gap-8 animate-marquee-slow hover:[animation-play-state:paused]">
                        
                        {[...Array(2)].map((_, loopIndex) => (
                            <React.Fragment key={loopIndex}>
                                {imagePaths.map((src, imgIndex) => (
                                    <img 
                                        key={`${loopIndex}-${imgIndex}`} 
                                        src={src} 
                                        alt="Game catalog card" 
                                        className="w-[220px] md:w-[260px] lg:w-[300px] flex-shrink-0 aspect-[3/4] object-cover rounded-2xl border border-neutral-800/50"
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div> */}

            </div>
        </section>
    );
};

export default BrowseCatalog;
