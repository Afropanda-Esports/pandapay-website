import React from 'react';
import xboxImg from '../../assets/explore/xbox.png';
import codImg from '../../assets/explore/cod.png';
import robloxImg from '../../assets/explore/roblox.png';

const ExploreShop: React.FC = () => {
    // const cards = [
    //     {
    //         id: 'xbox',
    //         title: 'Xbox Game Pass',
    //         description: 'Get Xbox game pass',
    //         image: xboxImg,
    //         featured: true,
    //     },
    //     {
    //         id: 'cod',
    //         title: 'Call of Duty Mobile',
    //         description: 'Top CODM credit',
    //         image: codImg,
    //         featured: false,
    //     },
    //     {
    //         id: 'roblox',
    //         title: 'Roblox',
    //         description: 'Get Roblox gift cards',
    //         image: robloxImg,
    //         featured: false,
    //     },
    // ];

    return (
        <section id="explore-shop" className="w-full bg-background py-20">
            <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
                <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col gap-12">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6 w-full">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-100 leading-tight ">
                            Play More. Less Stress.
                        </h2>
                        <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed ">
                            Buy gift cards, credits, and game passes for your favorite platforms, all in one checkout, powered by bank transfers, crypto, or gift cards.
                        </p>
                        <button className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary-500 text-neutral-100 text-sm font-semibold hover:bg-primary-500/10 transition-all">
                            Explore our shop
                        </button>
                    </div>

                    {/* Cards - Featured + Grid layout */}
                    <div className="flex flex-col gap-6">
                        {/* Xbox Game Pass - Featured (full width on desktop) */}
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
                            <img 
                                src={xboxImg} 
                                alt="Xbox Game Pass" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">
                                            Xbox Game Pass
                                        </h3>
                                        <p className="font-sans text-sm text-neutral-300">
                                            Get Xbox game pass
                                        </p>
                                    </div>
                                    <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* COD & Roblox - Grid (2 columns on desktop, stacked on mobile) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Call of Duty Mobile */}
                            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
                                <img 
                                    src={codImg} 
                                    alt="Call of Duty Mobile" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">
                                                Call of Duty Mobile
                                            </h3>
                                            <p className="font-sans text-sm text-neutral-300">
                                                Top CODM credit
                                            </p>
                                        </div>
                                        <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Roblox */}
                            <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
                                <img 
                                    src={robloxImg} 
                                    alt="Roblox" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">
                                                Roblox
                                            </h3>
                                            <p className="font-sans text-sm text-neutral-300">
                                                Get Roblox gift cards
                                            </p>
                                        </div>
                                        <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExploreShop;
