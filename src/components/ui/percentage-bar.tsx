import { memo } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface PercentageBarProps extends Omit<HTMLMotionProps<"div">, "style"> {
  percent: number;
  className?: string;
}

export const PercentageBar = memo(
  ({
    percent,
    className = "w-24 md:w-64 h-1.5",
    ...motionProps
  }: PercentageBarProps) => {
    return (
      <div
        className={`${className} rounded-full flex justify-end overflow-hidden mr-2`}
      >
        <motion.div
          className="h-full bg-primary rounded-full origin-left"
          style={{ width: `${Math.min(100, percent)}%` }}
          layout
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...motionProps}
        />
      </div>
    );
  }
);
PercentageBar.displayName = "PercentageBar";
