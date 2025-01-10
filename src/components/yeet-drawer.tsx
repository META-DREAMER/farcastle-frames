"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { customFormatEther } from "@/lib/format";
import {
  calculateMaxAffordableShares,
  calculateOwnershipPercentage,
  calculateSharesFromEthAmount,
  calculateRagequitValue,
} from "@/lib/eth-math";
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
import { useAccount } from "wagmi";
import { useYeet } from "@/lib/hooks/useYeet";
import { Abi } from "viem";

interface YeetDrawerProps {
  totalShares: number;
  raidGoal: bigint;
  treasuryBalance: bigint;
  sharePrice: bigint;
  walletBalance?: bigint;
  contractAddress: `0x${string}`;
  contractAbi: Abi;
}

export default function YeetDrawer({
  totalShares,
  treasuryBalance,
  sharePrice,
  walletBalance,
  contractAddress,
}: YeetDrawerProps) {
  const [selectedShares, setSelectedShares] = useState<number>(1);
  const [selectedEth, setSelectedEth] = useState<bigint>(sharePrice);

  const { isConnected } = useAccount();
  const {
    yeet,
    isLoading,
    isError,
    error: sendTxError,
    txHash,
    isConfirming,
    isConfirmed,
  } = useYeet({ contractAddress });

  const maxAffordableShares = calculateMaxAffordableShares(
    walletBalance ?? 0n,
    sharePrice
  );
  const ethAmount = selectedEth;

  const handleSharesInputChange = (ethValue: bigint) => {
    const shares = calculateSharesFromEthAmount(ethValue, sharePrice);
    setSelectedShares(Math.min(shares, maxAffordableShares));
    setSelectedEth(ethValue);
  };

  const handleEthInputChange = (value: string) => {
    try {
      const ethWei = parseEther(value);
      const validEthWei = walletBalance
        ? ethWei > walletBalance
          ? walletBalance
          : ethWei
        : 0n;
      const shares = calculateSharesFromEthAmount(validEthWei, sharePrice);
      setSelectedShares(Math.min(shares, maxAffordableShares));
      setSelectedEth(validEthWei);
    } catch {
      setSelectedShares(0);
      setSelectedEth(0n);
    }
  };

  const handleYeet = () => {
    if (!isConnected || selectedEth <= 0n) return;
    yeet(selectedEth);
  };

  const ownershipPercentage = calculateOwnershipPercentage(
    selectedShares,
    totalShares
  );

  const ragequitValue = calculateRagequitValue(
    selectedShares,
    totalShares,
    treasuryBalance
  );

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button size="lg" className="flex-1 h-12 w-full">
          Yeet
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerClose className="absolute left-4 top-4 rounded-sm opacity-30 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
          <DrawerHeader className="px-6 ">
            <DrawerTitle className="text-3xl font-heading font-bold">
              Yeet
            </DrawerTitle>
            <DrawerDescription className="text-base">
              Contribute ETH to the raid
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 space-y-6">
            <div className="space-y-4">
              <div className="relative h-2 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-success transition-all duration-500"
                  style={{
                    width: `${ownershipPercentage}%`,
                  }}
                />
                <div
                  className="absolute h-full bg-primary/20 transition-all duration-500"
                  style={{
                    width: `${100 - ownershipPercentage}%`,
                    left: `${ownershipPercentage}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-baseline">
                <div className="space-y-1">
                  <span
                    className={`text-lg font-bold ${
                      selectedShares > 0 ? "text-success" : ""
                    }`}
                  >
                    {selectedShares > 0 ? `+${selectedShares.toString()}` : "0"}{" "}
                    shares
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {selectedShares > 0
                      ? `${customFormatEther(ragequitValue)} ETH on ragequit`
                      : "No shares selected"}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-lg font-bold">
                    {ownershipPercentage.toFixed(2)}%
                  </span>
                  <div className="text-sm text-muted-foreground">
                    Your ownership
                  </div>
                </div>
              </div>

              <Card className="shadow-none">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <Input
                        id="eth-input"
                        type="number"
                        step={customFormatEther(sharePrice)}
                        value={
                          ethAmount > 0n
                            ? customFormatEther(ethAmount)
                            : customFormatEther(ethAmount)
                        }
                        onChange={(e) => handleEthInputChange(e.target.value)}
                        className="!text-4xl max-w-56 h-16 font-bold font-mono text-center w-full border-none shadow-none"
                        min="0"
                      />
                      <Label
                        htmlFor="eth-input"
                        className="text-sm text-muted-foreground"
                      >
                        ETH to Yeet
                      </Label>
                    </div>

                    <div className="">
                      <Slider
                        value={[Number(ethAmount / sharePrice)]}
                        onValueChange={([value]) =>
                          handleSharesInputChange(
                            BigInt(Math.floor(value)) * sharePrice
                          )
                        }
                        max={Number(walletBalance ?? 0n) / Number(sharePrice)}
                        step={1}
                        className="mt-4 py-6"
                      />
                      <div className="flex -mt-3 justify-between text-sm text-muted-foreground">
                        <span>0 ETH</span>
                        <span>
                          {customFormatEther(walletBalance ?? 0n)} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DrawerFooter>
            {isError && (
              <div className="text-sm text-red-500 mb-2">
                {sendTxError?.message}
              </div>
            )}
            {txHash && (
              <div className="text-sm text-muted-foreground mb-2">
                {isConfirming
                  ? "Confirming transaction..."
                  : isConfirmed
                  ? "Transaction confirmed!"
                  : "Transaction pending..."}
              </div>
            )}
            <Button
              className="w-full h-14 text-lg"
              disabled={selectedShares <= 0 || !isConnected || isLoading}
              onClick={handleYeet}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {isConfirming ? "Confirming..." : "Sending..."}
                </span>
              ) : (
                <>
                  Yeet{" "}
                  {/* {selectedShares > 0
                    ? `${customFormatEther(ethAmount)} ETH`
                    : ""} */}
                </>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
