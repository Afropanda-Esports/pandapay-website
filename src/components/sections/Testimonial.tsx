import React from 'react';

const Testimonial: React.FC = () => {
    return (
        <section id="testimonial" className="min-h-[60vh] flex items-center justify-center border-b border-neutral-900 px-6 md:px-12 lg:px-20">
            <div className="mx-auto max-w-360 w-full flex flex-col items-center text-center gap-6">
                <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-neutral-500">Testimonial Section</p>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-800">Testimonial</h2>
            </div>
        </section>
    );
};

export default Testimonial;
