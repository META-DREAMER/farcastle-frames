import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Separator } from "~/components/ui/separator"

// Placeholder function to fetch raid data
const fetchRaidData = async (raidId: string) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    name: "Farcastle T-Shirt Raid",
    description: "Produce and sell a limited edition Farcastle t-shirt featuring unique blockchain-inspired designs.",
    fundingGoal: 10,
    currentFunding: 6.5,
    roles: [
      { name: "Designer", filled: true, user: { name: "Alice", avatar: "/placeholder.svg" } },
      { name: "Developer", filled: false },
      { name: "Production Manager", filled: true, user: { name: "Bob", avatar: "/placeholder.svg" } },
    ],
    revenueSplit: {
      funders: 70,
      raidParty: 30
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

  if (!raidData) return <div>Loading raid info...</div>

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{raidData.name}</CardTitle>
        <CardDescription>{raidData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
          <Progress value={(raidData.currentFunding / raidData.fundingGoal) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {raidData.currentFunding} ETH raised of {raidData.fundingGoal} ETH goal
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Raid Party Roles</h3>
          <div className="space-y-4">
            {raidData.roles.map((role: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{role.name}</span>
                  {role.filled && (
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={role.user.avatar} alt={role.user.name} />
                        <AvatarFallback>{role.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{role.user.name}</span>
                    </div>
                  )}
                </div>
                {!role.filled && (
                  <Button 
                    onClick={() => handleApply(role.name)}
                    disabled={isApplying === role.name}
                  >
                    {isApplying === role.name ? 'Applying...' : 'Apply'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Revenue Split</h3>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Funders</p>
              <p className="text-2xl font-bold">{raidData.revenueSplit.funders}%</p>
            </div>
            <div>
              <p className="font-medium">Raid Party</p>
              <p className="text-2xl font-bold">{raidData.revenueSplit.raidParty}%</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contribute to Raid</Button>
      </CardFooter>
    </Card>
  )
}

