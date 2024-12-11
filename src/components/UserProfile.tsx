import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { userRaidDataOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";

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

  const displayName = user.displayName || user.username || `FID: ${user.fid}`;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center space-x-4">
        <Avatar>
          {user.pfpUrl ? (
            <AvatarImage src={user.pfpUrl} alt={displayName} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{displayName}</h3>
          {user.username && user.displayName && (
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          )}
        </div>
        <div className="text-right">
          <div className="font-medium">Your Contribution</div>
          <div className="text-lg font-bold">
            {userRaidData?.userYeetInfo.ethAmount || "0"} ETH
          </div>
          <div className="text-sm text-muted-foreground">
            Shares: {userRaidData?.userShares || 0}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
