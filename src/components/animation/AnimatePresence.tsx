"use client";

import { AnimatePresence as FramerAnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatePresenceProps {
  children: ReactNode;
}

const AnimatePresence: React.FC<AnimatePresenceProps> = ({ children }) => {
  return (
    <FramerAnimatePresence mode="wait">
      {children}
    </FramerAnimatePresence>
  );
};

export default AnimatePresence;
