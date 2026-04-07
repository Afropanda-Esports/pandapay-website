import painpointsSvg from '../../assets/Painpoints.svg';
import mobilePainpointsSvg from '../../assets/Mobile-Painpoints.svg';

const Painpoint: React.FC = () => {
    return (
        <section id="painpoint" className="border-b border-border py-20 px-6 md:px-12 lg:px-20">
            <div className="mx-auto max-w-360 w-full">

                {/* Desktop layout */}
                <div className="hidden lg:grid grid-cols-[3fr_2fr] items-end gap-12">

                    {/* Left: image — wider column */}
                    <img
                        src={painpointsSvg}
                        alt="Painpoints illustration"
                        className="w-full h-auto"
                    />

                    {/* Right: text */}
                    <div className="flex flex-col gap-4">
                        <p className="font-sans text-sm text-text-muted">
                            We've been there. We built Panda Pay to fix it.
                        </p>
                        <h2 className="font-heading text-5xl font-bold text-text-primary leading-tight">
                            The struggle before Panda Pay.
                        </h2>
                    </div>

                </div>

                {/* Mobile layout */}
                <div className="lg:hidden flex flex-col gap-8">
                    <div className="flex flex-col gap-3 text-center">
                        <p className="font-sans text-sm text-text-muted">
                            We've been there. We built Panda Pay to fix it.
                        </p>
                        <h2 className="font-heading text-xl font-bold text-text-primary leading-tight">
                            The struggle before Panda Pay.
                        </h2>
                    </div>
                    <img
                        src={mobilePainpointsSvg}
                        alt="Painpoints illustration"
                        className="w-full h-auto"
                    />
                </div>

            </div>
        </section>
    );
};

export default Painpoint;
