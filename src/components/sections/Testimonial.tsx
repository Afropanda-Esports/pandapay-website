import React from 'react';
import TestimonialCard from '../TestimonialCard';
import arcSvg from '../../assets/arc.svg';
import avatar01 from '../../assets/testimonials/Testimonial01.png';

const testimonials = [
  {
    quote: "Finally, a way to buy PlayStation credits with Naira and USDT. It was a smooth experience!",
    author: "Tunde",
    location: "Lagos, Nairobi",
    avatar: avatar01,
    bgColor: "bg-testimonial-1", // Orange-ish
    rotation: "-rotate-[12deg]",
    zIndex: "z-10",
    translate: "-translate-x-[520px] translate-y-12"
  },
  {
    quote: "Used USDT for my FIFA subscription and confirmation was instant. It was a good experience.",
    author: "Ama",
    location: "Accra",
    avatar: avatar01,
    bgColor: "bg-testimonial-2", // Peach
    rotation: "-rotate-[6deg]",
    zIndex: "z-20",
    translate: "-translate-x-[260px] translate-y-6"
  },
  {
    quote: "I’ve tried other platforms before, but Panda Pay’s checkout felt simpler and more transparent.",
    author: "Olu",
    location: "Ibadan",
    avatar: avatar01,
    bgColor: "bg-testimonial-3", // White
    rotation: "rotate-0",
    zIndex: "z-30",
    translate: "translate-x-0 translate-y-0"
  },
  {
    quote: "I uploaded my bank transfer proof and got my Steam code without delay. That was a first!",
    author: "Kofi",
    location: "Kumasi",
    avatar: avatar01,
    bgColor: "bg-testimonial-4", // Tan/Peach
    rotation: "rotate-[6deg]",
    zIndex: "z-20",
    translate: "translate-x-[260px] translate-y-6"
  },
  {
    quote: "The payment screen is perfect. It shows QR + exact amount. No guessing, no overpay.",
    author: "Ahmed",
    location: "Nairobi",
    avatar: avatar01,
    bgColor: "bg-testimonial-5", // Lighter Orange
    rotation: "rotate-[12deg]",
    zIndex: "z-10",
    translate: "translate-x-[520px] translate-y-12"
  }
];

const Testimonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = React.useState(2);
    const [isHovered, setIsHovered] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(2); // Default to middle card (Olu)
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const getDesktopCardStyles = (index: number) => {
        const t = testimonials[index];
        const dist = index - activeIndex;
        
        // BASE CASE: Not visible
        let rotation = "rotate-0";
        let translate = "translate-x-0 translate-y-0";
        let zIndex = "z-0";
        let scale = "scale-100";
        let opacity = "opacity-0 scale-95";

        if (isVisible) {
            opacity = "opacity-100 scale-100";
            
            if (isHovered) {
                // STATE 1: FANNED OUT (Hovered)
                // Use original wide translations but shift relative to active index
                // For simplicity, we keep original wide spread but highlight active
                translate = t.translate;
                rotation = t.rotation;
                zIndex = index === activeIndex ? "z-50" : t.zIndex;
                scale = index === activeIndex ? "scale-110" : "scale-100";
                if (activeIndex !== null && index !== activeIndex) opacity = "opacity-60";
            } else {
                // STATE 2: TIGHTLY STACKED (Default/Not Hovered)
                // Position relative to activeIndex (which is now persistent)
                zIndex = `z-[${40 - Math.abs(dist) * 10}]`; // Active is z-40, others lower
                scale = `${100 - Math.abs(dist) * 5}%`; // Slight scale down for depth
                
                // Tight offsets based on distance from active center
                const xOffset = dist * 20; // 20px spread
                const yOffset = Math.abs(dist) * 8; // 8px down
                const rOffset = dist * 4; // 4deg rotation
                
                translate = `translate-x-[${xOffset}px] translate-y-[${yOffset}px]`;
                rotation = `rotate-[${rOffset}deg]`;
                
                if (index === activeIndex) {
                    translate = "translate-x-0 translate-y-0";
                    rotation = "rotate-0";
                    zIndex = "z-40";
                    scale = "scale-105";
                }
            }
        }

        return `${rotation} ${translate} ${zIndex} ${scale} ${opacity}`;
    };

  return (
    <section 
      id="testimonial" 
      ref={sectionRef}
      className="w-full bg-background py-16 lg:py-32 border-b border-border overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-20 flex flex-col items-center">
        
        {/* Fan-out Cards Container (Desktop Only) */}
        <div 
            className="hidden lg:flex relative items-center justify-center w-full h-[550px] mb-20 order-1 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
              }}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${getDesktopCardStyles(i)} w-[340px] shadow-2xl`}
              style={{ transitionDelay: isVisible && !isHovered ? `${i * 50}ms` : '0ms' }}
            >
              <TestimonialCard 
                quote={t.quote}
                author={t.author}
                location={t.location}
                avatar={t.avatar}
                bgColor={t.bgColor}
              />
            </div>
          ))}
        </div>

        {/* Refined Heading - Top on Mobile, Bottom on Desktop */}
        <div className="text-center w-full mx-auto mb-16 lg:mb-0 order-1 lg:order-2">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-[56px] font-medium text-text-primary leading-tight">
            Trusted by thousands of gamers across <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              Africa
              <img 
                src={arcSvg} 
                alt="" 
                className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-[120%] h-auto pointer-events-none" 
              />
            </span>
          </h2>
        </div>

        {/* Mobile View (Carousel with Navigation) */}
        <div className="lg:hidden flex flex-col items-center w-full gap-10 order-2">
          {/* Card Sliding Area */}
          <div className="relative w-full max-w-[400px] overflow-visible">
            <div className="transition-all duration-500 transform translate-x-0">
               <TestimonialCard 
                  quote={testimonials[currentIndex].quote}
                  author={testimonials[currentIndex].author}
                  location={testimonials[currentIndex].location}
                  avatar={testimonials[currentIndex].avatar}
                  bgColor={testimonials[currentIndex].bgColor}
                />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevious}
              className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonial;
