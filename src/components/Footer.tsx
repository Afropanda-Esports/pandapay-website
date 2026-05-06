import { Instagram, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { footerRuleShadow } from '../layoutStyles';
import logoTextDark from '../assets/logo/logo-text-dark.png';
import logoTextLight from '../assets/logo/logo-text-light.png';
import { DISCORD_URL, INSTAGRAM_URL, TWITTER_URL, WHATSAPP_URL } from '../siteContent';

// Custom X (Twitter) icon matching the design roughly since standard Lucide X is basic
const XIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const Footer = () => {
    const { resolvedTheme } = useTheme();

    return (
        <footer className="w-full bg-background">
            <div className="mx-auto w-full max-w-[1440px] px-4 pt-16 pb-8 lg:px-20 flex flex-col gap-12">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Left: Socials */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-sans text-text-primary font-medium">Panda Pay</h3>
                        <p className="text-sm text-text-secondary">Your gaming store. On WhatsApp.</p>
                        <div className="flex items-center gap-6 text-text-secondary">
                            <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors" aria-label="X (Twitter)">
                                <XIcon />
                            </a>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Discord">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                        <a href={WHATSAPP_URL} className="inline-flex rounded-full border border-border px-4 py-2 text-sm hover:bg-primary-500/10" aria-label="Message us on WhatsApp">
                          Start on WhatsApp
                        </a>
                    </div>

                    {/* Right: Links */}
                    <div className="flex flex-col md:flex-row gap-16 md:gap-24 font-sans text-sm">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-text-primary font-medium mb-2">Navigation</h3>
                            <a href="#hero" className="text-text-secondary hover:text-text-primary transition-colors">Home</a>
                            <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
                            <a href="#crypto" className="text-text-secondary hover:text-text-primary transition-colors">Crypto</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-text-primary font-medium mb-2">Resources</h3>
                            <a href="#faq" className="text-text-secondary hover:text-text-primary transition-colors">FAQ</a>
                            <a href="#about" className="text-text-secondary hover:text-text-primary transition-colors">About</a>
                            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">Discord</a>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Image Graphic */}
                <div className="w-full flex justify-center py-8">
                    <img
                        src={resolvedTheme === 'dark' ? logoTextDark : logoTextLight}
                        alt="PandaPay Graphic"
                        className="w-full h-auto opacity-20 transition-opacity duration-500"
                    />
                </div>

                {/* Bottom Section: Legal & Copyright lines */}
                <div
                    className={`flex w-full flex-col justify-between gap-4 pt-8 font-sans text-xs text-text-muted md:flex-row ${footerRuleShadow}`}
                >
                    <p>© 2026 Panda Pay. Prices shown are approximate and subject to change with exchange rates.</p>
                    <div className="flex gap-6">
                        <span>PandaPay is built for African gamers using local and on-chain payment rails.</span>
                    </div>
                </div>
                <p className="text-xs text-text-muted">Current product availability starts with PlayStation gift cards and PS Plus, with broader catalog support expanding over time.</p>

            </div>
        </footer>
    );
};

export default Footer;
