/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useMutation } from "@tanstack/react-query";
import { type SliderData } from "~/components/multi-slider";

export interface Proposal {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  type: "funding" | "newMember" | "signal" | "loot";
  votes: {
    for: number;
    against: number;
  };
  timeLeft: string;
}

// Mock data
const mockRaidData = {
  totalShares: 950,
  userShares: 100,
  ethBalance: "18540296700000000000", // 10 ETH
  usdcBalance: "5249000000", // 5000 USDC (6 decimals)
  userYeetInfo: {
    ethAmount: "690000000000000000",
    purchaseTimestamp: 1699000000, // Unix timestamp of purchase
  },
};

// Mock proposals data
export const mockProposals = [
  {
    id: "1",
    title: "Increase Raid Fund Allocation by 5%",
    description:
      "Proposal to increase the raid fund allocation to support larger projects.",
    creator: {
      name: "Alice",
      avatar: "/avatars/alice.jpg",
    },
    type: "funding",
    votes: {
      for: 15,
      against: 3,
    },
    timeLeft: "2 days",
  },
  {
    id: "2",
    title: "Add New Member Bob to the Raid",
    description:
      "Proposal to add Bob as a new member given their expertise in production.",
    creator: {
      name: "Charlie",
      avatar: "/avatars/charlie.jpg",
    },
    type: "newMember",
    votes: {
      for: 12,
      against: 5,
    },
    timeLeft: "3 days",
  },
  {
    id: "3",
    title: "Change Merch Design Direction",
    description:
      "Proposal to pivot the merch design to focus on minimalist aesthetics.",
    creator: {
      name: "David",
      avatar: "/avatars/david.jpg",
    },
    type: "signal",
    votes: {
      for: 8,
      against: 7,
    },
    timeLeft: "1 day",
  },
  {
    id: "4",
    title: "Distribute Loot to Contributors",
    description:
      "Proposal to distribute accumulated loot to active contributors.",
    creator: {
      name: "Eve",
      avatar: "/avatars/eve.jpg",
    },
    type: "loot",
    votes: {
      for: 18,
      against: 1,
    },
    timeLeft: "4 days",
  },
] satisfies Proposal[];

// Add mock raid info
const mockRaidInfo = {
  name: "Farcastle Genesis Merch Drop",
  description: "Design, produce and sell the genesis merch drop for Farcastle",
  fundingGoal: 1,
  currentFunding: 0.69,
  roles: [
    {
      name: "Designer",
      filled: true,
      user: { name: "Alice", avatar: "/placeholder.svg" },
    },
    {
      name: "Production Manager",
      filled: true,
      user: { name: "Bob", avatar: "/placeholder.svg" },
    },
    { name: "Developer", filled: false },
  ],
  revenueSplit: {
    funders: 69,
    raidParty: 30,
    castle: 1,
  },
};

// Mock API functions
const fetchRaidInfo = async (raidId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockRaidInfo;
};

const fetchTotalShares = async (raidId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockRaidData.totalShares;
};

const fetchUserShares = async (raidId: string, address: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRaidData.userShares;
};

const fetchSafeBalance = async (raidId: string, tokenAddress: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tokenAddress === "0x0000000000000000000000000000000000000000"
    ? mockRaidData.ethBalance
    : mockRaidData.usdcBalance;
};

const fetchUserYeetInfo = async (raidId: string, address: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRaidData.userYeetInfo;
};

const executeRageQuit = async (raidId: string, shares: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Rage quit successful" };
};

// Mock allocation data
export const fetchInitialAllocation = async (
  raidId: string
): Promise<SliderData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 1, value: 25, label: "Ven" },
    { id: 2, value: 25, label: "META_DREAMER" },
    { id: 3, value: 25, label: "E2T" },
    { id: 4, value: 25, label: "Sam" },
  ];
};

// Mock data fetching functions
const fetchProposals = async (raidId: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProposals;
};

const fetchProposal = async (raidId: string, proposalId: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const proposal = mockProposals.find((p) => p.id === proposalId);
  if (!proposal) {
    throw new Error("Proposal not found");
  }
  return proposal;
};

// React Query hooks
export const useRaidInfo = (raidId: string) =>
  useQuery({
    queryKey: ["raidInfo", raidId],
    queryFn: () => fetchRaidInfo(raidId),
  });

export const useTotalShares = (raidId: string) =>
  useQuery({
    queryKey: ["totalShares", raidId],
    queryFn: () => fetchTotalShares(raidId),
  });

export const useUserShares = (raidId: string, address: string) =>
  useQuery({
    queryKey: ["userShares", raidId, address],
    queryFn: () => fetchUserShares(raidId, address),
  });

export const useSafeBalance = (raidId: string, tokenAddress: string) =>
  useQuery({
    queryKey: ["safeBalance", raidId, tokenAddress],
    queryFn: () => fetchSafeBalance(raidId, tokenAddress),
  });

export const useUserYeetInfo = (raidId: string, address: string) =>
  useQuery({
    queryKey: ["userYeetInfo", raidId, address],
    queryFn: () => fetchUserYeetInfo(raidId, address),
  });

export const useRageQuit = () =>
  useMutation({
    mutationFn: (variables: { raidId: string; shares: number }) =>
      executeRageQuit(variables.raidId, variables.shares),
  });

export const useInitialAllocation = (raidId: string) =>
  useQuery({
    queryKey: ["allocation", raidId],
    queryFn: () => fetchInitialAllocation(raidId),
  });

export const useProposals = (raidId: string) =>
  useQuery({
    queryKey: ["proposals", raidId],
    queryFn: () => fetchProposals(raidId),
  });

export const useProposal = (raidId: string, proposalId: string) =>
  useQuery({
    queryKey: ["proposal", raidId, proposalId],
    queryFn: () => fetchProposal(raidId, proposalId),
  });
