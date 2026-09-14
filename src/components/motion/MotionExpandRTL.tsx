import { type CSSProperties, type ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AbsoluteOverlay from "../../layout/absolute-overlay/AbsoluteOverlay.tsx";

type MotionExpandRTLProps = {
  children: ReactNode;
  isOpen: boolean;
};
const MotionExpandRTL = ({ children, isOpen }: MotionExpandRTLProps) => {
  // Use state to control the overflow style of the container.
  // This is necessary to prevent content from overflowing during the closing animation.
  const [overflowControl, setOverflowControl] = useState<
    CSSProperties["overflow"]
  >(isOpen ? "visible" : "hidden");

  function handleAnimationStart({ width }: { width: number | string }) {
    // Restrict this function to only handle the closing animation
    //
    // Sets the overflow style to hidden at the start of the closing animation to prevent content from overflowing
    // during the transition
    const closing = width === 0;
    if (closing) setOverflowControl("hidden");
  }

  function handleAnimationComplete({ width }: { width: number | string }) {
    // Restrict this function to only handle the opening animation
    // Allows the animation to complete prior to changing overflow style
    const opening = width !== 0;
    if (opening) setOverflowControl("visible");
  }

  return (
    <motion.div
      layout
      style={{
        justifySelf: "flex-end",
        alignContent: "center",
        overflow: overflowControl,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "auto",
              animationDuration: 0.1,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }}
            exit={{ width: 0 }}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
          >
            <div style={{ width: "fit-content", position: "relative" }}>
              {children}
              {/* Use a transparent overlay to restrict user interaction until animation completes */}
              {overflowControl !== "visible" && <AbsoluteOverlay />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MotionExpandRTL;
