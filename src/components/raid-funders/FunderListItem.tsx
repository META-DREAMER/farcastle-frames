import { memo } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PercentageBar } from "@/components/ui/percentage-bar";
import { FunderListItemProps } from "./types";

export const FunderListItem = memo(
  ({
    name,
    avatar,
    percentageShare,
    isCurrentUser,
    id,
  }: FunderListItemProps) => {
    return (
      <motion.li
        key={id}
        layout
        className="flex relative items-center py-2 px-3"
      >
        <motion.div layoutId={`avatar-${id}`}>
          <UserAvatar name={name} avatar={avatar} />
        </motion.div>
        <div className="flex ml-2">
          <div className="text-sm font-medium leading-none flex items-center gap-1.5">
            <span>{name}</span>
            {isCurrentUser && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4"
              >
                You
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute right-3">
          <div className="flex flex-grow justify-end items-center text-xs font-mono font-medium text-right">
            <PercentageBar percent={percentageShare} />
            {percentageShare.toFixed(1)}%
          </div>
        </div>
      </motion.li>
    );
  }
);
FunderListItem.displayName = "FunderListItem";
