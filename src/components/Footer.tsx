import { Instagram, Facebook } from 'lucide-react';
import footerImg from '../assets/footer-img.svg';

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
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background">
            <div className="mx-auto w-full max-w-360 px-4 lg:px-20 pt-16 pb-8 flex flex-col gap-12">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Left: Socials */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-sans text-neutral-100 font-medium">Stay connected with us</h3>
                        <div className="flex items-center gap-6 text-neutral-200">
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="X (Twitter)">
                                <XIcon />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Links */}
                    <div className="flex flex-col md:flex-row gap-16 md:gap-24 font-sans text-sm">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-neutral-100 font-medium mb-2">Company</h3>
                            <a href="#" className="text-neutral-300 hover:text-white transition-colors">About</a>
                            <a href="#" className="text-neutral-300 hover:text-white transition-colors">Games</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-neutral-100 font-medium mb-2">Resources</h3>
                            <a href="#" className="text-neutral-300 hover:text-white transition-colors">Blog</a>
                            <a href="#" className="text-neutral-300 hover:text-white transition-colors">Communities</a>
                            <a href="#" className="text-neutral-300 hover:text-white transition-colors">Help center</a>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Image Graphic */}
                <div className="w-full flex justify-center py-8">
                    <img
                        src={footerImg}
                        alt="PandaPay Graphic"
                        className="w-full h-auto opacity-20 transition-opacity duration-500"
                    />
                </div>

                {/* Bottom Section: Legal & Copyright lines */}
                <div className="w-full pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between gap-4 font-sans text-xs text-neutral-400">
                    <p>© {currentYear} PandaPay. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neutral-200 underline underline-offset-4 decoration-neutral-600">Terms of service</a>
                        <a href="#" className="hover:text-neutral-200 underline underline-offset-4 decoration-neutral-600">Privacy policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
