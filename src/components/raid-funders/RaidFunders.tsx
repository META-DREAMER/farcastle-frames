import { useMemo } from "react";
import { motion } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { safeDataOptions, userRaidDataOptions } from "@/app/api/mockRaidApi";
import { FunderListItem } from "./FunderListItem";
import { ExpandableFunders } from "./ExpandableFunders";
import { calculateFunderPercentages, calculatePercentage } from "./utils";
import { RaidFundersProps } from "./types";

export function RaidFunders({ raidId, user, address }: RaidFundersProps) {
  const { data: safeData } = useSuspenseQuery(safeDataOptions(raidId));
  const { data: userRaidData } = useSuspenseQuery(
    userRaidDataOptions(raidId, address)
  );

  const displayName = useMemo(
    () => (user ? user.displayName || user.username || `FID: ${user.fid}` : ""),
    [user]
  );

  const { visibleFunders, hiddenFunders, remainingPercentage } = useMemo(() => {
    const filteredFunders = safeData.funders.filter(
      (funder) =>
        !address || funder.address.toLowerCase() !== address.toLowerCase()
    );

    const visibleFundersCount = userRaidData ? 2 : 3;
    const visibleFunders = filteredFunders.slice(0, visibleFundersCount);
    const hiddenFunders = filteredFunders.slice(visibleFundersCount);

    const userPercentage = (userRaidData?.userSharesPercent ?? 0) * 100;
    const { remainingPercentage } = calculateFunderPercentages(
      visibleFunders,
      safeData.totalShares,
      userPercentage
    );

    return { visibleFunders, hiddenFunders, remainingPercentage };
  }, [safeData.funders, safeData.totalShares, userRaidData, address]);

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold">Funders</h2>
        <span className="text-muted-foreground font-medium">Shares</span>
      </div>

      <motion.div className="border rounded-lg bg-card overflow-hidden" layout>
        <motion.ul className="divide-y divide-border" layout>
          {userRaidData && (
            <FunderListItem
              key="user-funder"
              id={displayName}
              name={displayName}
              avatar={user?.pfpUrl}
              percentageShare={userRaidData.userSharesPercent * 100}
              isCurrentUser
            />
          )}

          {visibleFunders.map((funder) => (
            <FunderListItem
              key={`funder-${funder.id}`}
              id={funder.id}
              name={funder.name}
              avatar={funder.avatar}
              percentageShare={calculatePercentage(
                funder.shares,
                safeData.totalShares
              )}
            />
          ))}

          {hiddenFunders.length > 0 && (
            <ExpandableFunders
              key="expandable-funders"
              hiddenFunders={hiddenFunders}
              totalShares={safeData.totalShares}
              remainingPercentage={remainingPercentage}
            />
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
}
