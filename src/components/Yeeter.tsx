"use client"

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"

// Placeholder functions to simulate blockchain interactions
const fetchRaidInfo = async (raidAddress: string) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    name: "Sample Raid",
    balance: "10.5",
    memberCount: 5
  }
}

const simulateYeet = async (amount: string) => {
  // Simulated transaction
  await new Promise(resolve => setTimeout(resolve, 2000))
  return { success: true, hash: "0x123...abc" }
}

export function Yeeter({ raidAddress }: { raidAddress: string }) {
  const [ethAmount, setEthAmount] = useState('')
  const [shares, setShares] = useState<number>(0)
  const [raidInfo, setRaidInfo] = useState<{ name: string, balance: string, memberCount: number } | null>(null)
  const [isYeeting, setIsYeeting] = useState(false)
  const [yeetSuccess, setYeetSuccess] = useState(false)

  useEffect(() => {
    const loadRaidInfo = async () => {
      const info = await fetchRaidInfo(raidAddress)
      setRaidInfo(info)
    }
    loadRaidInfo()
  }, [raidAddress])

  useEffect(() => {
    if (ethAmount) {
      // Mock calculation - replace with actual calculation in a real scenario
      setShares(parseFloat(ethAmount) * 1000)
    } else {
      setShares(0)
    }
  }, [ethAmount])

  const handleYeet = async () => {
    if (ethAmount) {
      setIsYeeting(true)
      try {
        const result = await simulateYeet(ethAmount)
        if (result.success) {
          setYeetSuccess(true)
          // In a real scenario, you'd want to refresh the raid info here
        }
      } catch (error) {
        console.error("Yeet failed:", error)
      } finally {
        setIsYeeting(false)
      }
    }
  }

  if (!raidInfo) return <div>Loading raid info...</div>

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{raidInfo.name}</CardTitle>
        <CardDescription>Yeet ETH into the raid and receive shares</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Raid Balance:</span>
            <span>{raidInfo.balance} ETH</span>
          </div>
          <div className="flex justify-between">
            <span>Members:</span>
            <span>{raidInfo.memberCount}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ethAmount">ETH to Yeet</Label>
            <Input
              id="ethAmount"
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <span>Shares to Receive:</span>
            <span>{shares.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleYeet} 
          disabled={!ethAmount || isYeeting}
        >
          {isYeeting ? 'Yeeting...' : 'Yeet!'}
        </Button>
      </CardFooter>
      {yeetSuccess && (
        <div className="mt-4 text-center text-green-600">
          Successfully yeeted into the raid!
        </div>
      )}
    </Card>
  )
}

