import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ExpandedFundersList } from "./ExpandedFundersList";
import { CollapsedFundersList } from "./CollapsedFundersList";
import { Funder } from "./types";

export const ExpandableFunders = ({
  hiddenFunders,
  totalShares,
  remainingPercentage,
}: {
  hiddenFunders: Funder[];
  totalShares: number;
  remainingPercentage: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isExpanded ? (
        <ExpandedFundersList
          hiddenFunders={hiddenFunders}
          totalShares={totalShares}
          onCollapse={() => setIsExpanded(false)}
        />
      ) : (
        <CollapsedFundersList
          hiddenFunders={hiddenFunders}
          remainingPercentage={remainingPercentage}
          onExpand={() => setIsExpanded(true)}
        />
      )}
    </AnimatePresence>
  );
};
