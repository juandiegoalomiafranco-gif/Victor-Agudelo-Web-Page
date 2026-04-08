import React from 'react';
import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ 
  items, 
  direction = 'left', 
  speed = 40 
}) => {
  const containerVariants = {
    animate: {
      x: direction === 'left' ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: speed,
          ease: "linear" as const,
        },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden flex items-center h-24">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-12 items-center"
        variants={containerVariants}
        animate="animate"
      >
        {/* Triple the items to ensure seamless loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <span 
            key={idx} 
            className="text-2xl font-bold uppercase tracking-wider text-foreground opacity-30 hover:opacity-100 transition-opacity duration-300"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
