import React from 'react';

// Use import.meta.glob to dynamically import all images in the browse folder
const images = import.meta.glob('../../assets/browse/*.png', { eager: true, import: 'default' });
const imagePaths = Object.values(images) as string[];

// Chunk array into 4 columns (20 images total, 5 per column)
const columns = [
    imagePaths.slice(0, 5),
    imagePaths.slice(5, 10),
    imagePaths.slice(10, 15),
    imagePaths.slice(15, 20)
];

const BrowseCatalog: React.FC = () => {
    return (
        <section id="browse-catalog" className="relative w-full min-h-[80vh] bg-background py-20 overflow-hidden flex flex-col items-center">
            
            <div className="mx-auto max-w-[1440px] w-full px-6 flex flex-col items-center gap-12">
                <div className="text-center flex flex-col items-center gap-4">
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100">
                        Browse Catalog
                    </h2>
                    <p className="font-sans text-neutral-400 max-w-lg text-lg">
                        Discover thousands of games, gift cards, and subscriptions. All in one place.
                    </p>
                </div>

                {/* Grid container with fading mask top and bottom */}
                <div 
                    className="w-full h-[600px] overflow-hidden relative"
                    style={{ 
                        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', 
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' 
                    }}
                >
                    <div className="group flex justify-center gap-6 h-full w-full">
                        {columns.map((colImages, colIndex) => {
                            // On mobile, show only 1 column. Tablets 2 columns. Desktop 4 columns.
                            let responsiveClass = 'flex';
                            if (colIndex === 1) responsiveClass = 'hidden md:flex';
                            if (colIndex > 1) responsiveClass = 'hidden lg:flex';
                            
                            // Alternate directions: odd index columns go down, even go up
                            const isDown = colIndex % 2 !== 0; 
                            const animationClass = isDown ? 'animate-marquee-y-down' : 'animate-marquee-y-up';
                            
                            return (
                                <div key={colIndex} className={`w-full max-w-[280px] flex-col overflow-hidden ${responsiveClass}`}>
                                    <div className={`flex flex-col gap-6 w-full ${animationClass} group-hover:[animation-play-state:paused]`}>
                                        {/* Render twice for infinite loop */}
                                        {[...Array(2)].map((_, loopIndex) => (
                                            <React.Fragment key={loopIndex}>
                                                {colImages.map((src, imgIndex) => (
                                                    <img 
                                                        key={`${loopIndex}-${imgIndex}`} 
                                                        src={src} 
                                                        alt="Game catalog item" 
                                                        className="w-full aspect-[3/4] object-cover rounded-2xl border border-neutral-800/50"
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrowseCatalog;
