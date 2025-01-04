"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  userRaidDataOptions,
  useRageQuit,
  safeDataOptions,
} from "@/app/api/mockRaidApi";
import { customFormatEther, customFormatUnits } from "@/lib/format";
import { Separator } from "./ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";

function SharesProgressBar({
  totalShares: totalShares,
  userShares: userShares,
  selectedShares: selectedShares,
  originalEthAmount: originalEthAmount,
  safeData,
}: {
  totalShares: number;
  userShares: number;
  selectedShares: number;
  originalEthAmount: string;
  safeData: {
    assets: Array<{ symbol: string; amount: string; decimals: number }>;
  };
}) {
  const userSharesPercent = (userShares / totalShares) * 100;
  const selectedSharesPercent = (selectedShares / userShares) * 100;

  // Calculate total yeeted value (in ETH)
  const yeetedValue = BigInt(originalEthAmount);

  // Calculate current total value (in ETH)
  const ethAsset = safeData.assets.find((asset) => asset.symbol === "ETH");
  const currentEthValue = ethAsset ? BigInt(ethAsset.amount) : BigInt(0);
  const userCurrentValue =
    userShares > 0
      ? (currentEthValue * BigInt(userShares)) / BigInt(totalShares)
      : BigInt(0);

  return (
    <div className="space-y-4">
      <div>
        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/20 relative"
            style={{ width: `${userSharesPercent}%` }}
          >
            <div
              className="h-full bg-destructive transition-all duration-300"
              style={{ width: `${selectedSharesPercent}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-2 items-baseline mt-4">
          <span className="text-xl font-bold">
            {userShares.toLocaleString()} shares
          </span>
          <span className="text-sm text-muted-foreground">
            of {totalShares.toLocaleString()} total
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center space-y-1">
          <span className="font-mono font-bold">
            {customFormatEther(yeetedValue)}
            <span className="text-sm"> ETH</span>
          </span>
          <span className="text-sm text-muted-foreground">Yeeted</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="font-mono font-bold">
            {customFormatEther(userCurrentValue)}
            <span className="text-sm"> ETH</span>
          </span>
          <span className="text-sm text-muted-foreground">Current value</span>
        </div>
      </div>
    </div>
  );
}

export function RageQuitDrawer({
  raidId,
  totalShares,
}: {
  raidId: string;
  totalShares: number;
}) {
  const [sharesToRageQuit, setSharesToRageQuit] = useState(0);
  const address = "0x1234...5678"; // Mock user address

  const { data: safeData } = useSuspenseQuery(safeDataOptions(raidId));
  const { data: userData } = useSuspenseQuery(
    userRaidDataOptions(raidId, address)
  );
  const { mutate: ragequit, status, isSuccess } = useRageQuit();

  const isLoading = status === "pending";

  // Calculate user's share for each asset
  const assetShares = safeData.assets.map((asset) => ({
    symbol: asset.symbol,
    decimals: asset.decimals,
    share: totalShares
      ? (BigInt(sharesToRageQuit) * BigInt(asset.amount)) / BigInt(totalShares)
      : BigInt(0),
  }));

  const handleRageQuit = () => {
    ragequit({ raidId, shares: sharesToRageQuit });
  };

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="xl"
          className="flex-1 w-full text-destructive"
        >
          Rage Quit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerClose className="absolute left-4 top-4 rounded-sm opacity-30 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
          <DrawerHeader className="px-6">
            <DrawerTitle className="text-3xl font-heading font-bold">
              Rage Quit
            </DrawerTitle>
            <DrawerDescription className="text-base">
              Withdraw your funds from the raid
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 space-y-6">
            <SharesProgressBar
              totalShares={totalShares}
              userShares={Number(userData?.userShares || 0)}
              selectedShares={sharesToRageQuit}
              originalEthAmount={userData?.userYeetInfo?.ethAmount || "0"}
              safeData={safeData}
            />

            <div className="rounded-xl border bg-card touch-none">
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-heading font-bold">
                  You Will Receive
                </h3>
                <div className="space-y-1">
                  {assetShares.map(({ symbol, decimals, share }) => (
                    <div
                      key={symbol}
                      className="flex  justify-between items-center"
                    >
                      <span className="text-sm font-medium">{symbol}</span>
                      <span className="text-md font-mono font-bold text-success">
                        {customFormatUnits(share, decimals)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />

              <div className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-bold">By Burning</h3>
                  <span className="text-md font-mono text-destructive font-bold">
                    {sharesToRageQuit} Shares
                  </span>
                </div>
                <Slider
                  id="shares-slider"
                  className="py-6"
                  min={0}
                  max={userData?.userShares || 0}
                  step={1}
                  value={[sharesToRageQuit]}
                  onValueChange={(value) => setSharesToRageQuit(value[0])}
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button
              onClick={handleRageQuit}
              disabled={isLoading || sharesToRageQuit === 0}
              size="xl"
              className="w-full font-medium"
            >
              {isLoading ? "Confirming..." : "Rage Quit"}
            </Button>
            {isSuccess && (
              <p className="text-green-600 text-center text-sm font-medium">
                Rage quit successful! Your funds have been withdrawn.
              </p>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
