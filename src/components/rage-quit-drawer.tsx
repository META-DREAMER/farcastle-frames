"use client"

import { useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger, DrawerClose } from "~/components/ui/drawer"
import { Slider } from "~/components/ui/slider"
import { Button } from "~/components/ui/button"
import { X, TrendingUp, TrendingDown } from "lucide-react"
import { useTotalShares, useUserShares, useSafeBalance, useRageQuit, useUserYeetInfo } from '~/app/api/mockRaidApi'
import { customFormatEther, customFormatUnits } from '~/lib/format'
import { Separator } from './ui/separator'

function SharesProgressBar({ 
  totalShares, 
  userShares, 
  selectedShares,
  originalEthAmount
}: { 
  totalShares: number, 
  userShares: number, 
  selectedShares: number,
  originalEthAmount: string
}) {
  const userSharesPercent = (userShares / totalShares) * 100
  const selectedSharesPercent = (selectedShares / userShares) * 100

  return (
    <div className="space-y-4">
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
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <span className="text-xl font-bold">{userShares.toLocaleString()} shares</span>
          <span className="text-sm text-muted-foreground">of {totalShares.toLocaleString()} total</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {userSharesPercent.toFixed(1)}% ownership • {customFormatEther(BigInt(originalEthAmount))} ETH contributed
        </span>
      </div>
      
     
    </div>
  )
}

export function RageQuitDrawer({ raidId }: { raidId: string }) {
  const [sharesToRageQuit, setSharesToRageQuit] = useState(0)
  const address = '0x1234...5678' // Mock user address

  const { data: totalShares } = useTotalShares(raidId)
  const { data: userShares } = useUserShares(raidId, address)
  const { data: ethBalance } = useSafeBalance(raidId, '0x0000000000000000000000000000000000000000')
  const { data: usdcBalance } = useSafeBalance(raidId, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
  const { data: yeetInfo } = useUserYeetInfo(raidId, address)

  const { mutate: ragequit, status, isSuccess } = useRageQuit()

  const isLoading = status === 'pending';
  
  // Calculate user's share of funds
  const userEthShare = ethBalance && totalShares 
    ? (BigInt(sharesToRageQuit) * BigInt(ethBalance)) / BigInt(totalShares) 
    : BigInt(0)
  const userUsdcShare = usdcBalance && totalShares 
    ? (BigInt(sharesToRageQuit) * BigInt(usdcBalance)) / BigInt(totalShares) 
    : BigInt(0)



  const handleRageQuit = () => {
    ragequit({ raidId, shares: sharesToRageQuit })
  }

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="xl" className="flex-1 text-destructive">
          Rage Quit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerClose className="absolute left-4 top-4 rounded-sm opacity-30 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
          <DrawerHeader className="px-7">
            <DrawerTitle className="text-3xl font-heading font-bold">Rage Quit</DrawerTitle>
            <DrawerDescription className="text-base">
              Withdraw your funds from the raid
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-7 space-y-8">
            <div className="space-y-2">
              <SharesProgressBar 
                totalShares={Number(totalShares || 0)}
                userShares={Number(userShares || 0)}
                selectedShares={sharesToRageQuit}
                originalEthAmount={yeetInfo?.ethAmount || '0'}
              />
            </div>

            <div className="rounded-xl border bg-card space-y-6">
              <div className="p-6 pb-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">You will burn:</h3>
                  <span className="text-lg text-destructive font-bold">{sharesToRageQuit} Shares</span>
                </div>
                <div className="space-y-4">
                  <Slider
                    id="shares-slider"
                    min={0}
                    max={userShares || 0}
                    step={1}
                    value={[sharesToRageQuit]}
                    onValueChange={(value) => setSharesToRageQuit(value[0])}
                  />
                </div>
              </div>
              <Separator />
              <div className="p-6 pt-0 space-y-4">
                <h3 className="text-lg font-heading font-bold">You will receive:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ETH</span>
                    <span className="text-lg font-bold text-success">{customFormatEther(userEthShare)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">USDC</span>
                    <span className="text-lg font-bold text-success">{customFormatUnits(userUsdcShare, 6)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="p-7 space-y-3">
            <Button 
              onClick={handleRageQuit}
              disabled={isLoading || sharesToRageQuit === 0}
              size="xl"
              className="w-full font-medium"
            >
              {isLoading ? 'Confirming...' : 'Rage Quit'}
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
  )
}
