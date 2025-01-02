import { FrameContext } from "@farcaster/frame-sdk";

export interface Funder {
  id: string;
  name: string;
  avatar?: string;
  address: string;
  shares: number;
}

export interface RaidFundersProps {
  raidId: string;
  address: string | undefined;
  user: FrameContext["user"] | undefined;
}

export interface FunderListItemProps {
  id: string;
  name: string;
  avatar?: string;
  percentageShare: number;
  isCurrentUser?: boolean;
}
