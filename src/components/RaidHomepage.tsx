"use client";

import { useState, useEffect } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { useAccount } from "wagmi";
import { config } from "@/components/providers/WagmiProvider";
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
import { ActiveProposals } from "./active-proposals";
import { RaidParty } from "./raid-party";
import dynamic from "next/dynamic";
import { raidDataOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { truncateAddress } from "@/lib/truncateAddress";

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

// Preload the component
const preloadRageQuitDrawer = () => {
  // void operator prevents the unused promise warning
  void import("./rage-quit-drawer");
};

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
  // const { disconnect } = useDisconnect();
  // const { connect } = useConnect();

  // Initialize Frame SDK
  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  // Preload the drawer after raid data is loaded
  useEffect(() => {
    if (raidData) {
      preloadRageQuitDrawer();
    }
  }, [raidData]);

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
      alert("Please connect your wallet first");
      return;
    }
    alert(`Yeeting ETH into the raid!`);
  };

  return (
    <div className="container mx-auto p-0 sm:px-4 sm:py-8">
      <Card className="w-full max-w-2xl mx-auto rounded-none sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{raidData.name}</CardTitle>
          <CardDescription className="text-lg">
            {raidData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Progress
              value={(raidData.currentFunding / raidData.fundingGoal) * 100}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {raidData.currentFunding} ETH raised of {raidData.fundingGoal} ETH
              goal
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Revenue Split</h3>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Funders</p>
                <p className="text-2xl font-bold">
                  {raidData.revenueSplit.funders}%
                </p>
              </div>
              <div>
                <p className="font-medium">Raid Party</p>
                <p className="text-2xl font-bold">
                  {raidData.revenueSplit.raidParty}%
                </p>
              </div>
              <div>
                <p className="font-medium">Castle</p>
                <p className="text-2xl font-bold">
                  {raidData.revenueSplit.castle}%
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {address && (
              <div className="text-sm">
                Connected:{" "}
                <pre className="inline">{truncateAddress(address)}</pre>
              </div>
            )}

            {address && (
              <div className="w-full flex space-x-4">
                <Button onClick={handleYeet} size="xl" className="flex-1">
                  Yeet
                </Button>
                <RageQuitDrawer raidId={raidId} />
              </div>
            )}
          </div>

          <Separator />
          <RaidParty
            roles={raidData.roles}
            onApply={handleApply}
            isApplying={isApplying}
          />

          <ActiveProposals raidId={raidId} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
