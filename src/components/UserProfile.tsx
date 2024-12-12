import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FrameContext } from "@farcaster/frame-sdk";

interface UserProfileProps {
  user: FrameContext["user"];
}

export function UserProfile({ user }: UserProfileProps) {
  const displayName = user.displayName || user.username || `FID: ${user.fid}`;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8 border border-primary/10">
        {user.pfpUrl ? (
          <AvatarImage src={user.pfpUrl} alt={displayName} />
        ) : (
          <AvatarFallback className="bg-primary/5 text-primary text-sm">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <p className="text-foreground">
        Welcome back, <span className="font-medium">{displayName}</span>
      </p>
    </div>
  );
}
