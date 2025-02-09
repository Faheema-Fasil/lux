"use client";

import { motion } from "framer-motion";

interface EnterAnimationProps {
  children: React.ReactNode;
  duration?: number;
  scale?: number;
  bounce?: number;
}

const EnterAnimation: React.FC<EnterAnimationProps> = ({
  children,
  duration = 0.4, // Default duration
  scale = 0,       // Default starting scale
  bounce = 0.5,    // Default bounce effect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        type: "spring",
        bounce,
      }}
      style={{ display: "inline-block" }} // Ensure proper wrapping of children
    >
      {children}
    </motion.div>
  );
};

export default EnterAnimation;
