"use client";

import { AnimatePresence } from "framer-motion";

export function MotionLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
} 