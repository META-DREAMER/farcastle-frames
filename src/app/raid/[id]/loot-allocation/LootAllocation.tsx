'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { MultiSlider, type SliderData } from '~/components/multi-slider'

interface LootAllocationProps {
  raidId: string;
}

// Simulated fetch function - in real app would call API/contract
const fetchInitialAllocation = async (raidId: string): Promise<SliderData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - would normally fetch based on raidId
  return [
    { id: 1, value: 25, label: 'Ven' },
    { id: 2, value: 25, label: 'META_DREAMER' },
    { id: 3, value: 25, label: 'E2T' },
    { id: 4, value: 25, label: 'Sam' },
  ];
}

export function LootAllocation({ raidId }: LootAllocationProps) {
  const { data: initialAllocation, isLoading } = useQuery({
    queryKey: ['allocation', raidId],
    queryFn: () => fetchInitialAllocation(raidId),
  })

  const [allocation, setAllocation] = useState<SliderData[]>([])

  // Update local state when initial data loads
  useEffect(() => {
    if (initialAllocation) {
      setAllocation(initialAllocation)
    }
  }, [initialAllocation])

  const handleSliderChange = (newAllocation: SliderData[]) => {
    setAllocation(newAllocation)
  }

  const handleDefault = () => {
    if (initialAllocation) {
      setAllocation(initialAllocation)
    }
  }

  const handleConfirm = () => {
    // TODO: Implement the logic to submit the loot allocation
    console.log('Submitting loot allocation:', allocation)
    // You can add your submission logic here, such as calling an API or updating the blockchain
  }

  return (
    <div className="container mx-auto p-0 sm:px-4 sm:py-8">
      <Card className="w-full max-w-lg mx-0 rounded-none mx-auto sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Split Loot
          </CardTitle>
          <CardDescription>
            Allocate shares based on each player's contribution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              Loading allocation data...
            </div>
          ) : (
            <MultiSlider 
              sliders={allocation} 
              onValueChange={handleSliderChange}
              className="w-full"
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleDefault} disabled={isLoading}>Default</Button>
          <Button onClick={handleConfirm} disabled={isLoading}>Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

