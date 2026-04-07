import React from 'react';
import { ArrowUpRight, Gamepad2, CreditCard, Zap } from 'lucide-react';

// import xboxImg from '../../assets/explore/xbox.png';
// import codImg from '../../assets/explore/cod.png';
// import robloxImg from '../../assets/explore/roblox.png';

// const OldExploreShop: React.FC = () => {
//     return (
//         <section id="explore-shop" className="w-full bg-background py-20">
//             <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
//                 <div className="bg-surface border border-border rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col gap-12">
//                     <div className="flex flex-col items-center text-center gap-6 w-full">
//                         <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight">
//                             Play More. Less Stress.
//                         </h2>
//                         <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
//                             Buy gift cards, credits, and game passes for your favorite platforms, all in one checkout, powered by bank transfers, crypto, or gift cards.
//                         </p>
//                         <button className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary-500 text-text-primary text-sm font-semibold hover:bg-primary-500/10 transition-all">
//                             Explore our shop
//                         </button>
//                     </div>
//                     <div className="flex flex-col gap-6">
//                         <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
//                             <img src={xboxImg} alt="Xbox Game Pass" className="w-full h-full object-cover" />
//                             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//                                 <div className="flex items-end justify-between">
//                                     <div>
//                                         <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">Xbox Game Pass</h3>
//                                         <p className="font-sans text-sm text-neutral-300">Get Xbox game pass</p>
//                                     </div>
//                                     <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">Buy now</button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
//                                 <img src={codImg} alt="Call of Duty Mobile" className="w-full h-full object-cover" />
//                                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//                                     <div className="flex items-end justify-between">
//                                         <div>
//                                             <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">Call of Duty Mobile</h3>
//                                             <p className="font-sans text-sm text-neutral-300">Top CODM credit</p>
//                                         </div>
//                                         <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">Buy now</button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto">
//                                 <img src={robloxImg} alt="Roblox" className="w-full h-full object-cover" />
//                                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//                                     <div className="flex items-end justify-between">
//                                         <div>
//                                             <h3 className="font-heading text-lg font-bold text-neutral-100 mb-1">Roblox</h3>
//                                             <p className="font-sans text-sm text-neutral-300">Get Roblox gift cards</p>
//                                         </div>
//                                         <button className="px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-900 rounded-full text-sm font-semibold transition-colors">Buy now</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

const products = [
    {
        title: 'Xbox Game Pass',
        description: 'Unlock 100+ games with a single pass. Play on console, PC, and cloud.',
        tag: 'Popular',
        icon: Gamepad2,
    },
    {
        title: 'Call of Duty Mobile',
        description: 'Top up your CODM credits instantly. Get CP packs at the best rates.',
        tag: 'Hot',
        icon: Zap,
    },
    {
        title: 'Roblox Gift Cards',
        description: 'Gift Robux to yourself or friends. Redeem across all Roblox platforms.',
        tag: 'Gift Ready',
        icon: CreditCard,
    },
];

const ExploreShop: React.FC = () => {
    return (
        <section id="explore-shop" className="w-full bg-background py-20">
            <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
                <div className="bg-surface border border-border rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col gap-14">

                    {/* Header */}
                    {/* <div className="flex flex-col items-center text-center gap-6  mx-auto">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                            Play More. Less Stress.
                        </h2>
                        <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
                            Buy gift cards, credits, and game passes for your favorite platforms — all in one checkout, powered by bank transfers, crypto, or gift cards.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary-500 text-text-primary text-sm font-semibold hover:bg-primary-500/10 transition-all"
                        >
                            Explore our shop
                            <ArrowUpRight size={16} />
                        </a>
                    </div> */}
                      <div className="flex flex-col items-center text-center gap-6 w-full">
                         <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                             Play More. Less Stress.
                         </h2>
                         <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
                             Buy gift cards, credits, and game passes for your favorite platforms, all in one checkout, powered by bank transfers, crypto, or gift cards.
                         </p>
                         <button className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-primary-500 text-text-primary text-sm font-semibold hover:bg-primary-500/10 transition-all">
                             Explore our shop
                         </button>
                     </div>

                    {/* Product cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product) => {
                            const Icon = product.icon;
                            return (
                                <div
                                    key={product.title}
                                    className="group relative flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-border bg-background hover:border-primary-500/40 transition-colors cursor-pointer"
                                >
                                    {/* Tag */}
                                    <span className="self-start px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-semibold tracking-wide">
                                        {product.tag}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-surface-raised flex items-center justify-center text-text-secondary group-hover:text-primary-500 transition-colors">
                                        <Icon size={24} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="font-heading text-lg font-bold text-text-primary">
                                            {product.title}
                                        </h3>
                                        <p className="font-sans text-sm text-text-muted leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-end pt-4 border-t border-border-subtle">
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                                            Learn more <ArrowUpRight size={14} />
                                        </span>
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

export default ExploreShop;
