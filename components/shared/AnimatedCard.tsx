import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AnimatedCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100 
      }}
    >
      <Card className="bg-indigo-950 border border-purple-500/20">
        {children}
      </Card>
    </motion.div>
  );
} 