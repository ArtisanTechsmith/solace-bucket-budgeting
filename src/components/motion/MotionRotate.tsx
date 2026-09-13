import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export type MotionRotateProps = {
  rotate?: number;
};
export const MotionRotate = ({
  children,
  rotate,
}: PropsWithChildren<MotionRotateProps>) => {
  return (
    <motion.div
      initial={{}}
      animate={{ transform: `rotate(${rotate}deg)`, animationDuration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
