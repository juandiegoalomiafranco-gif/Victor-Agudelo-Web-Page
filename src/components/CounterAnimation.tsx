import React, { useEffect, useRef, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ 
  value, 
  suffix = "", 
  duration = 2 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30, // Ease-out curve
  });
  
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export default CounterAnimation;
