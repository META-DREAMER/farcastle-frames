import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  layoutId?: string;
  className?: string;
}

export const UserAvatar = memo(
  ({ name, avatar, className = "h-6 w-6" }: UserAvatarProps) => (
    <Avatar className={`${className} border-2 border-background`}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback delayMs={100}>{name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
);
UserAvatar.displayName = "FunderAvatar";
