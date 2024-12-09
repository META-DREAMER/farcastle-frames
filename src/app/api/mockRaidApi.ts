import { useQuery, useMutation } from '@tanstack/react-query'

// Mock data
const mockRaidData = {
  totalShares: 950,
  userShares: 100,
  ethBalance: '18540296700000000000', // 10 ETH
  usdcBalance: '5249000000', // 5000 USDC (6 decimals)
  userYeetInfo: {
    ethAmount: '690000000000000000',
    purchaseTimestamp: 1699000000, // Unix timestamp of purchase
  }
}

// Add mock raid info
const mockRaidInfo = {
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

// Mock API functions
const fetchRaidInfo = async (raidId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return mockRaidInfo
}

const fetchTotalShares = async (raidId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return mockRaidData.totalShares
}

const fetchUserShares = async (raidId: string, address: string) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockRaidData.userShares
}

const fetchSafeBalance = async (raidId: string, tokenAddress: string) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return tokenAddress === '0x0000000000000000000000000000000000000000' 
    ? mockRaidData.ethBalance 
    : mockRaidData.usdcBalance
}

const fetchUserYeetInfo = async (raidId: string, address: string) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockRaidData.userYeetInfo
}

const executeRageQuit = async (raidId: string, shares: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: 'Rage quit successful' }
}

// React Query hooks
export const useRaidInfo = (raidId: string) => 
  useQuery({
    queryKey: ['raidInfo', raidId],
    queryFn: () => fetchRaidInfo(raidId)
  })

export const useTotalShares = (raidId: string) => 
  useQuery({
    queryKey: ['totalShares', raidId],
    queryFn: () => fetchTotalShares(raidId)
  })

export const useUserShares = (raidId: string, address: string) => 
  useQuery({
    queryKey: ['userShares', raidId, address],
    queryFn: () => fetchUserShares(raidId, address)
  })

export const useSafeBalance = (raidId: string, tokenAddress: string) => 
  useQuery({
    queryKey: ['safeBalance', raidId, tokenAddress],
    queryFn: () => fetchSafeBalance(raidId, tokenAddress)
  })

export const useUserYeetInfo = (raidId: string, address: string) => 
  useQuery({
    queryKey: ['userYeetInfo', raidId, address],
    queryFn: () => fetchUserYeetInfo(raidId, address)
  })

export const useRageQuit = () => 
  useMutation({
    mutationFn: (variables: { raidId: string, shares: number }) => 
      executeRageQuit(variables.raidId, variables.shares)
  })

