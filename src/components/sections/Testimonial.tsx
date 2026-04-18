import React from 'react';
import avatar01 from '../../assets/testimonials/Testimonial01.png';
import TestimonialCard from '../TestimonialCard';
import FadeReveal from '../FadeReveal';

const testimonials = [
  {
    quote: 'Finally, a way to buy PlayStation credits with Naira and USDT. It was a smooth experience!',
    author: 'Tunde',
    location: 'Lagos, Nairobi',
    avatar: avatar01,
    bgColor: 'bg-testimonial-1',
  },
  {
    quote: 'Used USDT for my FIFA subscription and confirmation was instant. It was a good experience.',
    author: 'Ama',
    location: 'Accra',
    avatar: avatar01,
    bgColor: 'bg-testimonial-2',
  },
  {
    quote: 'I’ve tried other platforms before, but Panda Pay’s checkout felt simpler and more transparent.',
    author: 'Olu',
    location: 'Ibadan',
    avatar: avatar01,
    bgColor: 'bg-testimonial-3',
  },
];

const Testimonial: React.FC = () => {
  return (
    <section
      id="testimonial"
      className="w-full overflow-hidden bg-background py-16 shadow-[var(--shadow-section-separate)] lg:py-24"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col items-stretch px-4 lg:px-20">
        <FadeReveal className="mb-12 w-full min-w-0 max-w-4xl">
          <div className="w-full min-w-0">
            <p className="w-full min-w-0 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Trust
            </p>
            <h2 className="mt-5 w-full min-w-0 font-heading text-3xl font-bold leading-tight text-text-primary md:text-5xl">
              Trusted by gamers across Africa.
            </h2>
            <p className="mt-5 w-full min-w-0 max-w-3xl font-sans text-base leading-8 text-text-muted">
              Clearer payments should create calmer feedback too. These are the kinds
              of reactions the product should keep earning.
            </p>
          </div>
        </FadeReveal>

        <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:grid-rows-1">
          {testimonials.map((testimonial, index) => (
            <FadeReveal key={testimonial.author} className="h-full w-full" delay={index * 0.08}>
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                avatar={testimonial.avatar}
                bgColor={testimonial.bgColor}
              />
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
