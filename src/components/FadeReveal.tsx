import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { layoutFullWidth } from '../layoutStyles';

interface FadeRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

/** Layout lives on a plain div so flex sizing never interacts with `motion.div` (Framer can confuse Safari flex). */

const FadeReveal = ({
  children,
  className,
  delay = 0,
  distance = 24,
}: FadeRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    margin: '-10% 0px -10% 0px',
  });

  return (
    <div
      ref={ref}
      className={['w-full min-w-0', className].filter(Boolean).join(' ')}
      style={layoutFullWidth}
    >
      <motion.div
        className="block h-full min-h-0 w-full min-w-0"
        style={layoutFullWidth}
        initial={false}
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="block h-full min-h-0 w-full min-w-0 max-w-full" style={layoutFullWidth}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default FadeReveal;
