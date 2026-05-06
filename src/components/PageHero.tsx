import type { ReactNode } from "react";
import Navbar from "./Navbar";
import FadeReveal from "./FadeReveal";

type Props = {
  badge?: string;
  title: string;
  body: string;
  children?: ReactNode;
};

export default function PageHero({ badge, title, body, children }: Props) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 px-6 pb-16 pt-10 md:px-12 lg:px-20">
        <div className="flex w-full flex-col justify-center gap-8">
          <FadeReveal className="w-full max-w-4xl">
            {badge ? (
              <div className="inline-flex rounded-full bg-primary-500/10 px-4 py-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
                  {badge}
                </span>
              </div>
            ) : null}
            <h1 className="mt-5 font-heading text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] text-[#120B04] dark:text-[rgb(225,225,227)]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-base leading-8 text-[#6B5642] dark:text-[rgba(225,225,227,0.55)] md:text-lg">
              {body}
            </p>
          </FadeReveal>
          {children}
        </div>
      </div>
    </section>
  );
}
