import headController from "../../assets/micro-story/head-controller.svg";
import cardIcon from "../../assets/micro-story/card.svg";
import walletIcon from "../../assets/micro-story/wallet.svg";
import controllerIcon from "../../assets/micro-story/controller.svg";
import pandaIcon from "../../assets/panda-icon.svg";
import regionIcon from "../../assets/micro-story/region.svg";

const MicroStory: React.FC = () => {
  return (
    <section
      id="micro-story"
      className="flex flex-col items-center justify-center border-b border-border px-6 md:px-12 lg:px-20 py-20 gap-10"
    >
      {/* Badge row */}
      <div className="relative flex items-center w-full max-w-360">
        {/* Left line */}
        <div className="flex-1 h-px bg-linear-to-r from-transparent to-primary-500/50" />

        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-primary-500/50 bg-surface/80 backdrop-blur-sm mx-4 shrink-0"
        >
          <img src={headController} alt="" className="w-5 h-5" />
          <span className="font-sans text-sm font-medium text-text-primary whitespace-nowrap">
            Built for gamers, by gamers.
          </span>
        </div>

        {/* Right line */}
        <div className="flex-1 h-px bg-linear-to-l from-transparent to-primary-500/50" />
      </div>

      {/* Story text */}
      <div className="w-full max-w-360 flex flex-col gap-6 text-center font-heading font-bold leading-tight">
        {/* Paragraph 1 — 20px mobile → 48px desktop */}
        <p className="text-text-secondary" style={{ fontSize: "clamp(20px, 3.5vw, 48px)" }}>
          We were tired of juggling cards{" "}
          <img src={cardIcon} alt="card" className="inline w-12 h-12 -mt-2" />{" "}
          wallets{" "}
          <img src={walletIcon} alt="wallet" className="inline w-12 h-12 -mt-2" />{" "}
          and region{" "}
          <img src={regionIcon} alt="region" className="inline w-12 h-12 -mt-2" />{" "}
          codes just to renew a subscription.
        </p>

        {/* Paragraph 2 — 28px mobile → 60px desktop */}
        <p className="text-text-primary" style={{ fontSize: "clamp(28px, 4.5vw, 60px)" }}>
          So we built a bridge{" "}
          <img src={pandaIcon} alt="panda" className="inline w-14 h-14 -mt-2" />{" "}
          that speaks every currency a gamer uses.{" "}
          <span className="text-primary-500 italic">Panda Pay</span> makes sure
          you're always in the game{" "}
          <img src={controllerIcon} alt="controller" className="inline w-14 h-14 -mt-2" />
        </p>
      </div>
    </section>
  );
};

export default MicroStory;
