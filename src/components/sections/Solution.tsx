import desktopSvg from '../../assets/desktop.svg';
import wrapperSvg from '../../assets/Wrapper.svg';
import instantDelivery from '../../assets/solution-icons/instant-delivery.svg';
import multiPayment from '../../assets/solution-icons/multi-payment.svg';
import regionSmart from '../../assets/solution-icons/region-smart.svg';
import transparentFee from '../../assets/solution-icons/transparent-fee.svg';
const features = [
  { icon: instantDelivery, title: 'Instant Delivery', description: 'No waiting, no guesswork' },
  { icon: multiPayment,    title: 'Multi-Payment',    description: 'Bank • Crypto • Gift Cards' },
  { icon: regionSmart,     title: 'Region Smart',     description: 'Matches your account region' },
  { icon: transparentFee,  title: 'Transparent Fees', description: 'What you see is what you pay' },
];

const Solution = () => {
  return (
    <section id="solution" className="flex items-center  border-b border-neutral-900 py-12 lg:py-20">
      <div className="mx-auto w-full max-w-360 px-4 py-12 lg:px-20 lg:py-0">
        <div className="flex flex-col items-center gap-16">

          {/* Heading */}
          <h2 className="font-heading font-bold text-neutral-700 text-center w-full text-[clamp(2.5rem,8vw,8rem)] leading-none mask-[linear-gradient(to_bottom,black_30%,transparent_100%)]">
            Pay with less stress
          </h2>

          {/* Desktop image */}
          <div className="hidden lg:flex w-full justify-center">
            <img src={desktopSvg} alt="PandaPay solution overview" className="w-full  h-auto" />
          </div>

          {/* Mobile image + cards */}
          <div className="lg:hidden flex flex-col items-center gap-6 w-full">
            <img src={wrapperSvg} alt="PandaPay solution overview" className="w-full h-auto" />

            <div className="flex flex-col gap-4 w-full">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center gap-3 bg-surface border border-[#2A2A2A] rounded-md p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                    <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                  </div>
                  <p className="font-sans text-sm font-bold text-neutral-100">{feature.title}</p>
                  <p className="font-sans text-xs text-neutral-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solution;
