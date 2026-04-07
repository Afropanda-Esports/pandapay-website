import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Use import.meta.glob to dynamically import all images in the browse folder
// const images = import.meta.glob('../../assets/browse/*.png', { eager: true, import: 'default' });
// const imagePaths = Object.values(images) as string[];

const BrowseCatalog: React.FC = () => {
    return (
        <section id="browse-catalog" className="w-full bg-background py-12 lg:py-20 border-b border-border">
            <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full mb-12">
                    {/* Left: Title */}
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold text-text-primary  tracking-tight">
                        Your favorite <span className="text-primary-500">platforms,</span><br/> unlocked!
                    </h2>

                    {/* Right: Info + CTA */}
                    <div className="flex flex-col items-start lg:items-end gap-6 max-w-[320px] shrink-0 lg:pt-2">
                        <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed lg:text-right">
                            Browse over 100+ digital SKUs. Localized pricing in USD, NGN, GHS, and more.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-3 bg-white hover:bg-neutral-200 transition-colors rounded-full pl-5 pr-1.5 py-1.5"
                        >
                            <span className="font-sans font-semibold text-neutral-900 text-sm">
                                Browse catalog
                            </span>
                            <span className="w-7 h-7 rounded-full bg-surface flex items-center justify-center shrink-0">
                                <ArrowUpRight size={16} className="text-white" />
                            </span>
                        </a>
                    </div>
                </div>

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
