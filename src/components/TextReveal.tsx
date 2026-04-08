import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="relative overflow-hidden inline-block mr-[0.3em] pb-1">
          <motion.span
            initial={{ clipPath: "inset(0 0 100% 0)", y: "100%" }}
            animate={isInView ? { clipPath: "inset(0 0 0% 0)", y: "0%" } : {}}
            transition={{
              duration: 0.8,
              delay: delay + (i * 0.05),
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
