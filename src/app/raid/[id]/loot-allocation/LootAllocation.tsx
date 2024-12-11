"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MultiSlider, type SliderData } from "@/components/multi-slider";
import { initialAllocationOptions } from "@/app/api/mockRaidApi";
import { useSuspenseQuery } from "@tanstack/react-query";

interface LootAllocationProps {
  raidId: string;
}

export function LootAllocation({ raidId }: LootAllocationProps) {
  const { data: initialAllocation } = useSuspenseQuery(
    initialAllocationOptions(raidId)
  );
  const [allocation, setAllocation] = useState<SliderData[]>([]);

  useEffect(() => {
    if (initialAllocation) {
      setAllocation(initialAllocation);
    }
  }, [initialAllocation]);

  const handleSliderChange = (newAllocation: SliderData[]) => {
    setAllocation(newAllocation);
  };

  const handleDefault = () => {
    if (initialAllocation) {
      setAllocation(initialAllocation);
    }
  };

  const handleConfirm = () => {
    // TODO: Implement the logic to submit the loot allocation
    console.log("Submitting loot allocation:", allocation);
    // You can add your submission logic here, such as calling an API or updating the blockchain
  };

  return (
    <div className="container mx-auto p-0 sm:px-4 sm:py-8">
      <Card className="w-full max-w-lg rounded-none mx-auto sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Split Loot</CardTitle>
          <CardDescription>
            Allocate shares based on each player&apos;s contribution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MultiSlider
            sliders={allocation}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleDefault}>
            Default
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
