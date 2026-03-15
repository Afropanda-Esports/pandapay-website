import React from 'react';
import quoteIcon from '../assets/quote.svg';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  avatar: string;
  bgColor: string;
  quoteColor?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  location,
  avatar,
  bgColor,
}) => {
  return (
    <div 
      className={`relative p-8 md:p-10 rounded-[32px] flex flex-col gap-8 h-full min-h-[400px] justify-between transition-transform duration-300 hover:scale-[1.02] ${bgColor}`}
    >
      {/* Top Section: Avatar & Quote Icon */}
      <div className="flex justify-between items-start">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/20">
          <img 
            src={avatar} 
            alt={author} 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <img 
          src={quoteIcon} 
          alt="Quote" 
          className="w-12 h-12 md:w-16 md:h-14 object-contain opacity-80" 
        />
      </div>

      {/* Quote Text */}
      <p className="font-sans text-xl md:text-2xl font-medium text-neutral-900 leading-tight">
        “{quote}”
      </p>

      {/* Author Info */}
      <div className="flex flex-col">
        <span className="font-heading font-bold text-lg text-neutral-900">
          {author}, {location}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
