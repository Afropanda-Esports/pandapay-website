import React from 'react';
import starIcon from '../../assets/Star.svg';

const MARQUEE_ITEMS = [
    'PayAndPlay',
    'GameWithoutLimits',
    'SeamlessPayments',
    'PlayMoreStressLess',
    'GamingMadeEasy',
];

const Marquee: React.FC = () => {
    return (
        <div className="relative w-full overflow-hidden flex flex-col justify-center items-center pb-4 pt-10">
            {/* The Slanted Banner Container */}
            <div className="group w-[110vw] -ml-[5vw] bg-surface/60 backdrop-blur-md border-y border-border py-4 -rotate-2 transform-gpu">
                {/* The Scrolling Element */}
                <div className="flex w-fit whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
                    {/* Render the list multiple times for seamless infinite scrolling on all screens */}
                    {[...Array(4)].map((_, arrayIndex) => (
                        <div key={arrayIndex} className="flex items-center gap-8 px-4">
                            {MARQUEE_ITEMS.map((item, index) => (
                                <div key={`${arrayIndex}-${index}`} className="flex items-center gap-6">
                                    <img src={starIcon} alt="" aria-hidden="true" className="w-4 h-4" />
                                    <span className="font-heading font-bold text-text-primary text-lg md:text-xl lg:text-2xl tracking-wide">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
