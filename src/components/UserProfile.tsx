import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { userRaidDataOptions, raidDataOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { customFormatEther } from "@/lib/format";

interface UserProfileProps {
  user: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  raidId: string;
  address: string;
}

interface UserRaidData {
  userShares: number;
  userYeetInfo: {
    ethAmount: string;
    purchaseTimestamp: number;
  };
}

export function UserProfile({ user, raidId, address }: UserProfileProps) {
  const { data: userRaidData } = useSuspenseQuery<UserRaidData>(
    userRaidDataOptions(raidId, address)
  );
  const { data: raidData } = useSuspenseQuery(raidDataOptions(raidId));

  const displayName = user.displayName || user.username || `FID: ${user.fid}`;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const userSharesPercent =
    (userRaidData?.userShares / Number(raidData.totalShares || 0)) * 100;

  return (
    <Card className="w-full bg-muted shadow-none">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border border-primary/10">
              {user.pfpUrl ? (
                <AvatarImage src={user.pfpUrl} alt={displayName} />
              ) : (
                <AvatarFallback className="bg-primary/5 text-primary text-sm">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <p className="text-foreground">
                Welcome back,{" "}
                <span className="font-medium text-foreground">
                  {displayName}
                </span>
              </p>
              <div className="text-sm text-muted-foreground">
                {userSharesPercent.toFixed(1)}% ownership •{" "}
                {customFormatEther(
                  BigInt(userRaidData?.userYeetInfo.ethAmount || "0")
                )}
                {" ETH contributed"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
