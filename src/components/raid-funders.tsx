import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { safeDataOptions, userRaidDataOptions } from "@/app/api/mockRaidApi";
import { FrameContext } from "@farcaster/frame-sdk";
import { Skeleton } from "@/components/ui/skeleton";

interface RaidFundersProps {
  raidId: string;
  address: string | undefined;
  user: FrameContext["user"] | undefined;
  onFundersClick: () => void;
}

interface FunderListItemProps {
  name: string;
  avatar?: string;
  percentageShare: number;
  isCurrentUser?: boolean;
}

function PercentageBar({ percent }: { percent: number }) {
  return (
    <div className="w-24 h-1.5 rounded-full flex justify-end overflow-hidden mr-2">
      <div
        className="h-full bg-primary rounded-full"
        style={{ width: `${Math.min(100, percent)}%` }}
      />
    </div>
  );
}

function FunderListItem({
  name,
  avatar,
  percentageShare,
  isCurrentUser,
}: FunderListItemProps) {
  return (
    <li className="flex items-center space-x-2 py-2 px-3">
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="text-sm font-medium leading-none flex items-center gap-2">
          <span>{name}</span>
          {isCurrentUser && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
              You
            </Badge>
          )}
        </div>
      </div>
      <div className="flex relative items-center text-xs font-mono font-medium text-right">
        <PercentageBar percent={percentageShare} />
        {percentageShare.toFixed(1)}%
      </div>
    </li>
  );
}

export function RaidFunders({
  raidId,
  user,
  address,
  onFundersClick,
}: RaidFundersProps) {
  const { data: safeData } = useSuspenseQuery(safeDataOptions(raidId));
  const { data: userRaidData } = useSuspenseQuery(
    userRaidDataOptions(raidId, address)
  );

  const displayName = user
    ? user.displayName || user.username || `FID: ${user.fid}`
    : "";

  const filteredFunders = safeData.funders.filter(
    (funder) =>
      !address || funder.address.toLowerCase() !== address.toLowerCase()
  );

  const visibleFundersCount = userRaidData ? 2 : 3;
  const visibleFunders = filteredFunders.slice(0, visibleFundersCount);
  const hiddenFunders = filteredFunders.slice(visibleFundersCount);

  const calculateRemainingPercentage = () => {
    const userPercentage = (userRaidData?.userSharesPercent ?? 0) * 100;
    const visibleFundersPercentage = visibleFunders.reduce(
      (acc, funder) => acc + (funder.shares / safeData.totalShares) * 100,
      0
    );
    return 100 - userPercentage - visibleFundersPercentage;
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold">Funders</h2>
        <span className="text-muted-foreground font-medium">Shares</span>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {userRaidData && (
            <FunderListItem
              name={displayName}
              avatar={user?.pfpUrl}
              percentageShare={userRaidData.userSharesPercent * 100}
              isCurrentUser
            />
          )}

          {visibleFunders.map((funder) => (
            <FunderListItem
              key={funder.id}
              name={funder.name}
              avatar={funder.avatar}
              percentageShare={(funder.shares / safeData.totalShares) * 100}
            />
          ))}

          <li>
            <button
              onClick={onFundersClick}
              className="flex items-center w-full py-2 px-3 hover:bg-muted transition-colors"
            >
              <div className="flex -space-x-2 mr-2">
                {hiddenFunders.length <= 4 ? (
                  // If 4 or less hidden funders, show them all
                  hiddenFunders.map((funder) => (
                    <Avatar
                      key={funder.id}
                      className="h-6 w-6 border-2 border-background"
                    >
                      <AvatarImage src={funder.avatar} alt={funder.name} />
                      <AvatarFallback>{funder.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))
                ) : (
                  // If more than 4, show first 3 plus a +N avatar
                  <>
                    {hiddenFunders.slice(0, 3).map((funder) => (
                      <Avatar
                        key={funder.id}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage src={funder.avatar} alt={funder.name} />
                        <AvatarFallback>
                          {funder.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="bg-muted text-xs">
                        +{hiddenFunders.length - 3}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>
              <span className="text-sm flex-1 text-left">
                {hiddenFunders.length} others
              </span>
              <div className="flex font-mono items-center text-xs font-medium text-right">
                <PercentageBar percent={calculateRemainingPercentage()} />
                <span className="">
                  {calculateRemainingPercentage().toFixed(1)}%
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function RaidFundersSkeleton() {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold">Funders</h2>
        <span className="text-muted-foreground font-medium">Shares</span>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center space-x-2 py-2 px-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex-grow">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-1.5 w-24 rounded-full" />
                <Skeleton className="h-4 w-8" />
              </div>
            </li>
          ))}
          <li>
            <div className="flex items-center w-full py-2 px-3">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <Skeleton className="h-4 w-16 ml-2" />
              <div className="flex ml-auto items-center space-x-2">
                <Skeleton className="h-1.5 w-24 rounded-full" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
