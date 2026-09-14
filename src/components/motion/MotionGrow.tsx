import { motion, useAnimation } from "framer-motion";
import { createElement, type CSSProperties, type ReactNode } from "react";
import { useCallbackRef } from "@mantine/hooks";

export type MotionGrowProps = {
  withHoverControl?: boolean;
  children?:
    | ReactNode
    | ((props: { grow: () => void; restore: () => void }) => ReactNode);
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
};
const MotionGrow = ({
  children,
  withHoverControl,
  ...rest
}: MotionGrowProps) => {
  const controls = useAnimation();

  // Create wrapper functions that trigger animation state changes via controls.
  const grow = () => controls.start({ scale: 1.4 });
  const restore = () => controls.start({ scale: 1 });

  const ref = useCallbackRef((node: HTMLDivElement) => {
    if (withHoverControl) {
      node?.addEventListener("mouseenter", (e) => {
        e.preventDefault();
        void grow();
      });
      node?.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        void restore();
      });
    }
  });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ scale: 1 }} // Using scale directly as it's cleaner for transform
      animate={controls}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      {...rest}
    >
      {typeof children === "function"
        ? createElement(children, { grow, restore })
        : children}
    </motion.div>
  );
};

export default MotionGrow;
