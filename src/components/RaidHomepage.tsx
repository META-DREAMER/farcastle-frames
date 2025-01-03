"use client";

import { useState, useEffect, Suspense } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ActiveProposals, ActiveProposalsSkeleton } from "./active-proposals";
import { RaidParty } from "./raid-party";
import dynamic from "next/dynamic";
import { raidDataOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wagmiConfig } from "./providers/WagmiProvider";
import { RaidFunders, RaidFundersSkeleton } from "@/components/raid-funders";
import { LayoutGroup } from "motion/react";

const RageQuitDrawer = dynamic(
  () =>
    import("./rage-quit-drawer").then((mod) => ({
      default: mod.RageQuitDrawer,
    })),
  {
    loading: () => null,
    ssr: false,
  }
);

// Placeholder function to simulate applying for a role
const applyForRole = async (raidId: string, role: string) => {
  // Simulated API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, raidId, role };
};

export default function RaidHomepage({ raidId }: { raidId: string }) {
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const { data: raidData } = useSuspenseQuery(raidDataOptions(raidId));

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { user } = context || {
    user: {
      fid: 0,
      username: "anon",
      displayName: "Anon",
      pfpUrl: "https://avatar.iran.liara.run/username?username=anon",
    },
  };

  const userAddress = isSDKLoaded ? address || "0x1234...abcd" : undefined;

  // Initialize Frame SDK
  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready({ disableNativeGestures: true });
    };
    console.log({ isSDKLoaded });
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const handleApply = async (role: string) => {
    if (!isConnected) {
      console.log(context);
      alert("Please connect your wallet first");
      return;
    }

    setIsApplying(role);
    try {
      await applyForRole(raidId, role);
      alert(`Applied for ${role} successfully!`);
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to apply for the role. Please try again.");
    } finally {
      setIsApplying(null);
    }
  };

  const handleYeet = () => {
    if (!address) {
      connect({ connector: wagmiConfig.connectors[0] });
      return;
    }
    alert(`Yeeting ETH into the raid!`);
  };

  return (
    <div className="container mx-auto p-0 sm:px-4 sm:py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-none rounded-none sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{raidData.name}</CardTitle>
          <CardDescription className="text-lg">
            {raidData.description}
          </CardDescription>
        </CardHeader>
        <LayoutGroup id="raid-funders">
          <CardContent className="space-y-6">
            <div className="">
              <Progress
                value={(raidData.currentFunding / raidData.fundingGoal) * 100}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {raidData.currentFunding} ETH raised of {raidData.fundingGoal}{" "}
                ETH goal
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-md font-semibold">Revenue Split</h3>
              <div className="flex items-center gap-2">
                {raidData.revenueSplit.map((split) => (
                  <Badge
                    key={split.name}
                    variant="muted"
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs text-secondary-foreground">
                      {split.name}
                    </span>
                    <span className="font-mono text-xs font-bold">
                      {split.percentage}%
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="w-full flex space-x-4">
              <Button onClick={handleYeet} size="xl" className="flex-1">
                Yeet
              </Button>
              {userAddress && (
                <RageQuitDrawer
                  totalShares={raidData.totalShares}
                  raidId={raidId}
                />
              )}
            </div>

            <Separator />

            <Suspense fallback={<RaidFundersSkeleton />}>
              <RaidFunders raidId={raidId} user={user} address={userAddress} />
            </Suspense>

            <RaidParty
              roles={raidData.roles}
              onApply={handleApply}
              isApplying={isApplying}
            />

            <Suspense fallback={<ActiveProposalsSkeleton />}>
              <ActiveProposals raidId={raidId} />
            </Suspense>
          </CardContent>
        </LayoutGroup>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
