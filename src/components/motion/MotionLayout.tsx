import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export const MotionLayout = ({ children }: PropsWithChildren) => {
  return <motion.div layout>{children}</motion.div>;
};
