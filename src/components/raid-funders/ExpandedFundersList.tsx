import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PercentageBar } from "@/components/ui/percentage-bar";
import { calculatePercentage } from "./utils";
import { Funder } from "./types";

const ExpandedFunderItem = memo(
  ({
    id,
    name,
    avatar,
    shares,
    index,
    totalShares,
  }: {
    id: string;
    name: string;
    avatar?: string;
    shares: number;
    index: number;
    totalShares: number;
  }) => {
    const percentage = calculatePercentage(shares, totalShares);

    return (
      <motion.li
        initial={false}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div
          className="flex relative items-center py-2 px-3"
          //   layout
          //   initial={false}
          //   animate={{ opacity: 1 }}
          //   exit={{ opacity: 1 }}
        >
          <motion.div layoutId={`avatar-${id}`}>
            <UserAvatar name={name} avatar={avatar} />
          </motion.div>
          <motion.div
            className="flex ml-2"
            initial={index === 0 ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={index === 0 ? { opacity: 1 } : { opacity: 0 }}
          >
            <motion.div
              layout
              className="text-sm font-medium leading-none"
              layoutId={index === 0 ? "first-funder-name" : undefined}
              initial={index === 0 ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={index === 0 ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                delay: index * 0.05,
              }}
            >
              {name}
            </motion.div>
          </motion.div>
          <motion.div
            layout
            className="absolute right-2"
            initial={index === 0 ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={index === 0 ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.3 },
              delay: index * 0.05,
            }}
            layoutId={index === 0 ? "percentage-container" : undefined}
          >
            <div className="flex flex-grow justify-end items-center text-xs font-mono font-medium text-right">
              <PercentageBar
                percent={percentage}
                layoutId={index === 0 ? "bar-first-row" : undefined}
              />
              <motion.div
                layoutId={index === 0 ? "percentage-text" : undefined}
                className="text-xs font-mono font-medium"
              >
                {percentage.toFixed(1)}%
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.li>
    );
  }
);
ExpandedFunderItem.displayName = "ExpandedFunderItem";

export const ExpandedFundersList = memo(
  ({
    hiddenFunders,
    totalShares,
    onCollapse,
  }: {
    hiddenFunders: Funder[];
    totalShares: number;
    onCollapse: () => void;
  }) => (
    <motion.div
      initial={{ height: "2.5rem" }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      layoutId="expandable-row"
    >
      <motion.ul className="divide-y divide-border">
        <AnimatePresence>
          {hiddenFunders.map((funder, index) => (
            <ExpandedFunderItem
              key={funder.id}
              id={funder.id}
              name={funder.name}
              avatar={funder.avatar}
              shares={funder.shares}
              index={index}
              totalShares={totalShares}
            />
          ))}
          <motion.li key="collapse-button" layout>
            <button
              onClick={onCollapse}
              className="flex items-center justify-center w-full py-2 px-3 hover:bg-muted/60 bg-muted/40 transition-colors text-xs text-muted-foreground font-medium"
            >
              Collapse
            </button>
          </motion.li>
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  )
);
ExpandedFundersList.displayName = "ExpandedFundersList";
