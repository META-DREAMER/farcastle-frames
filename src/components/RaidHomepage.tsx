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
import { RaidParty, RaidPartySkeleton } from "./raid-party";
import dynamic from "next/dynamic";
import { raidDataOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wagmiConfig } from "./providers/WagmiProvider";
import { RaidFunders, RaidFundersSkeleton } from "@/components/raid-funders";
import { LayoutGroup } from "motion/react";
import { parseEther } from "viem";
import { customFormatEther } from "@/lib/format";

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

const YeetDrawer = dynamic(
  () =>
    import("./yeet-drawer").then((mod) => ({
      default: mod.default,
    })),
  {
    loading: () => (
      <Button size="lg" className="flex-1 h-12 w-full">
        Yeet
      </Button>
    ),
    ssr: false,
  }
);

export default function RaidHomepage({ raidId }: { raidId: string }) {
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
    console.log({ isSDKLoaded, isConnected });
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded, isConnected]);

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
                value={Number(
                  (raidData.currentFunding * 100n) / raidData.fundingGoal
                )}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {customFormatEther(raidData.currentFunding)} ETH raised of{" "}
                {customFormatEther(raidData.fundingGoal)} ETH goal
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
              {userAddress ? (
                <>
                  <YeetDrawer
                    totalShares={raidData.totalShares}
                    raidGoal={raidData.fundingGoal}
                    treasuryBalance={raidData.currentFunding}
                    sharePrice={parseEther("0.0005")}
                    walletBalance={parseEther("0.785")}
                    contractAddress={raidData.contractAddress}
                    contractAbi={raidData.contractAbi}
                  />
                  <RageQuitDrawer
                    totalShares={raidData.totalShares}
                    raidId={raidId}
                  />
                </>
              ) : (
                <Button
                  onClick={() =>
                    connect({ connector: wagmiConfig.connectors[0] })
                  }
                  size="xl"
                  className="flex-1"
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            <Separator />

            <Suspense fallback={<RaidFundersSkeleton />}>
              <RaidFunders raidId={raidId} user={user} address={userAddress} />
            </Suspense>

            <Suspense
              fallback={<RaidPartySkeleton members={raidData.members} />}
            >
              <RaidParty raidId={raidId} />
            </Suspense>

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
