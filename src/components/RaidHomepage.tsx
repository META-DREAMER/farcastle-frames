"use client"

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Separator } from "~/components/ui/separator"
import { Input } from "~/components/ui/input"
import { ActiveProposals } from './active-proposals'
import { mockProposals } from '~/app/mocks/proposals'
import { RaidParty } from './raid-party'

// Placeholder function to fetch raid data
const fetchRaidData = async (raidId: string) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    name: "Farcastle Genesis Merch Drop",
    description: "Design, produce and sell the genesis merch drop for Farcastle",
    fundingGoal: 1,
    currentFunding: 0.69,
    roles: [
      { name: "Designer", filled: true, user: { name: "Alice", avatar: "/placeholder.svg" } },
      { name: "Production Manager", filled: true, user: { name: "Bob", avatar: "/placeholder.svg" } },
      { name: "Developer", filled: false },
    ],
    revenueSplit: {
      funders: 69,
      raidParty: 30,
      castle: 1
    }
  }
}

// Placeholder function to simulate applying for a role
const applyForRole = async (raidId: string, role: string) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true }
}

export default function RaidHomepage({ raidId }: { raidId: string }) {
  const [raidData, setRaidData] = useState<any>(null)
  const [isApplying, setIsApplying] = useState<string | null>(null)
  const [yeetAmount, setYeetAmount] = useState('')

  useEffect(() => {
    const loadRaidData = async () => {
      const data = await fetchRaidData(raidId)
      setRaidData(data)
    }
    loadRaidData()
  }, [raidId])

  const handleApply = async (role: string) => {
    setIsApplying(role)
    try {
      await applyForRole(raidId, role)
      // In a real app, you'd want to refresh the raid data here
      alert(`Applied for ${role} successfully!`)
    } catch (error) {
      console.error("Application failed:", error)
      alert("Failed to apply for the role. Please try again.")
    } finally {
      setIsApplying(null)
    }
  }

  const handleYeet = () => {
    // Placeholder for yeet functionality
    alert(`Yeeting ${yeetAmount} ETH into the raid!`)
  }

  if (!raidData) return <div>Loading raid info...</div>

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">{raidData.name}</CardTitle>
        <CardDescription className="text-lg">{raidData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Progress value={(raidData.currentFunding / raidData.fundingGoal) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {raidData.currentFunding} ETH raised of {raidData.fundingGoal} ETH goal
          </p>
        </div>
 
        <div>
          <h3 className="text-xl font-semibold mb-4">Revenue Split</h3>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Funders</p>
              <p className="text-2xl font-bold">{raidData.revenueSplit.funders}%</p>
            </div>
            <div>
              <p className="font-medium">Raid Party</p>
              <p className="text-2xl font-bold">{raidData.revenueSplit.raidParty}%</p>
            </div>
            <div>
              <p className="font-medium">Castle</p>
              <p className="text-2xl font-bold">{raidData.revenueSplit.castle}%</p>
            </div>
          </div>
        </div> 
        
        <div className="w-full flex space-x-4">
          <Button onClick={handleYeet} variant="secondary" size="xl" className="flex-1">Rage Quit</Button>
          <Button onClick={handleYeet} size="xl" className="flex-1">Yeet</Button>
        </div>
        <Separator />
        <RaidParty 
          roles={raidData.roles}
          onApply={handleApply}
          isApplying={isApplying}
        />
      
         <ActiveProposals raidId={raidId} proposals={mockProposals} />
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

