import { memo } from "react";
import { motion } from "motion/react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PercentageBar } from "@/components/ui/percentage-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HIDDEN_AVATARS_TO_SHOW } from "./utils";
import { Funder } from "./types";

export const CollapsedFundersList = memo(
  ({
    hiddenFunders,
    remainingPercentage,
    onExpand,
  }: {
    hiddenFunders: Funder[];
    remainingPercentage: number;
    onExpand: () => void;
  }) => (
    <motion.li layout>
      <button
        onClick={onExpand}
        className="flex items-center w-full py-2 px-3 hover:bg-muted transition-colors relative"
      >
        <div className="flex -space-x-2 mr-2">
          {hiddenFunders.length <= 4 ? (
            hiddenFunders.map((funder) => (
              <motion.div
                key={`avatar-${funder.id}`}
                layoutId={`avatar-${funder.id}`}
              >
                <UserAvatar name={funder.name} avatar={funder.avatar} />
              </motion.div>
            ))
          ) : (
            <>
              {hiddenFunders.slice(0, HIDDEN_AVATARS_TO_SHOW).map((funder) => (
                <motion.div
                  key={`avatar-${funder.id}`}
                  layoutId={`avatar-${funder.id}`}
                >
                  <UserAvatar name={funder.name} avatar={funder.avatar} />
                </motion.div>
              ))}
              <motion.div
                layoutId={`avatar-${hiddenFunders[HIDDEN_AVATARS_TO_SHOW].id}`}
              >
                <Avatar className="h-6 w-6 border-2 border-background bg-secondary">
                  <AvatarFallback className="bg-muted text-xs">
                    +{hiddenFunders.length - HIDDEN_AVATARS_TO_SHOW}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </>
          )}
        </div>
        <motion.div className="flex-1 flex items-center" layout>
          <motion.div
            className="text-sm text-left"
            layoutId="first-funder-name"
          >
            {hiddenFunders.length} others
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute right-2"
          layoutId="percentage-container"
        >
          <div className="flex flex-grow justify-end items-center text-xs font-mono font-medium text-right">
            <PercentageBar
              percent={remainingPercentage}
              layoutId="bar-first-row"
            />
            <motion.div
              layoutId="percentage-text"
              className="text-xs font-mono font-medium"
            >
              {remainingPercentage.toFixed(1)}%
            </motion.div>
          </div>
        </motion.div>
      </button>
    </motion.li>
  )
);
CollapsedFundersList.displayName = "CollapsedFundersList";
