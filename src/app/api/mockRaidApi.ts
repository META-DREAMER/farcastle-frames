/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useMutation,
  queryOptions,
  type QueryKey,
  QueryClient,
  QueryOptions,
} from "@tanstack/react-query";
import { type SliderData } from "@/components/multi-slider";

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

export interface SafeData {
  totalValueUSD: number;
  totalShares: number;
  assets: Array<{
    symbol: string;
    amount: string;
    decimals: number;
    valueUSD: number;
  }>;
  funders: Array<{
    id: string;
    avatar: string;
    name: string;
    address: string;
    shares: number;
  }>;
}

export interface RaidData {
  name: string;
  description: string;
  fundingGoal: number;
  currentFunding: number;
  totalShares: number;
  roles: {
    name: string;
    filled: boolean;
    user?: {
      name: string;
      avatar: string;
    };
  }[];
  revenueSplit: Array<{
    name: string;
    percentage: number;
  }>;
}

// Mock data
const mockUserRaidData = {
  userShares: 100,
  userSharesPercent: 0.105,
  userYeetInfo: {
    ethAmount: "690000000000000000",
    purchaseTimestamp: 1699000000, // Unix timestamp of purchase
  },
};

// Mock safe data
const mockSafeData = {
  totalValueUSD: 42500, // $42,500 total value
  totalShares: 950,
  assets: [
    {
      symbol: "ETH",
      amount: "18540296700000000000", // 18.54 ETH
      decimals: 18,
      valueUSD: 37080, // at $2000/ETH
    },
    {
      symbol: "USDC",
      amount: "5249000000", // 5249 USDC
      decimals: 6,
      valueUSD: 5249,
    },
  ],
  funders: [
    {
      id: "1",
      name: "Alice",
      avatar: "https://avatar.iran.liara.run/public/1",
      address: "0x1234567890123456789012345678901234567890",
      shares: 200,
    },
    {
      id: "2",
      name: "Bob",
      avatar: "https://avatar.iran.liara.run/public/2",
      address: "0x2345678901234567890123456789012345678901",
      shares: 150,
    },
    {
      id: "3",
      name: "Charlie",
      avatar: "https://avatar.iran.liara.run/public/3",
      address: "0x3456789012345678901234567890123456789012",
      shares: 100,
    },
    {
      id: "4",
      name: "David",
      avatar: "https://avatar.iran.liara.run/public/4",
      address: "0x4567890123456789012345678901234567890123",
      shares: 70,
    },
    {
      id: "5",
      name: "Eve",
      avatar: "https://avatar.iran.liara.run/public/5",
      address: "0x5678901234567890123456789012345678901234",
      shares: 50,
    },
    {
      id: "6",
      name: "Frank",
      avatar: "https://avatar.iran.liara.run/public/6",
      address: "0x6789012345678901234567890123456789012345",
      shares: 30,
    },
    {
      id: "7",
      name: "George",
      avatar: "https://avatar.iran.liara.run/public/7",
      address: "0x8789012345678901234567890123456789012345",
      shares: 20,
    },
  ],
} satisfies SafeData;

// Add mock raid info
const mockRaidInfo = {
  name: "Farcastle Genesis Merch Drop",
  description: "Design, produce and sell the genesis merch drop for Farcastle",
  fundingGoal: 1,
  currentFunding: 0.69,
  totalShares: 950,
  roles: [
    {
      name: "Designer",
      filled: true,
      user: { name: "Alice", avatar: "https://avatar.iran.liara.run/public/1" },
    },
    {
      name: "Production Manager",
      filled: true,
      user: { name: "Bob", avatar: "https://avatar.iran.liara.run/public/2" },
    },
    { name: "Developer", filled: false },
  ],
  revenueSplit: [
    { name: "Funders", percentage: 69 },
    { name: "Raid Party", percentage: 30 },
    { name: "Castle", percentage: 1 },
  ],
} satisfies RaidData;

// Mock proposals data
export const mockProposals = [
  {
    id: "1",
    title: "Increase Raid Fund Allocation by 5%",
    description:
      "Proposal to increase the raid fund allocation to support larger projects.",
    creator: {
      name: "Alice",
      avatar: "https://avatar.iran.liara.run/public/3",
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
      avatar: "https://avatar.iran.liara.run/public/4",
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
      avatar: "https://avatar.iran.liara.run/public/5",
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
      avatar: "https://avatar.iran.liara.run/public/6",
    },
    type: "loot",
    votes: {
      for: 18,
      against: 1,
    },
    timeLeft: "4 days",
  },
] satisfies Proposal[];

// Mock API functions
const fetchRaidData = async (raidId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockRaidInfo;
};

const fetchSafeData = async (raidId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockSafeData;
};

const fetchUserRaidData = async (
  raidId: string,
  address: string | undefined
) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return address ? mockUserRaidData : null;
};

const executeRageQuit = async (raidId: string, shares: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Rage quit successful" };
};

export const useRageQuit = () =>
  useMutation({
    mutationFn: (variables: { raidId: string; shares: number }) =>
      executeRageQuit(variables.raidId, variables.shares),
  });

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
interface ProposalsOptions {
  limit?: number;
}

const fetchProposals = async (raidId: string, options?: ProposalsOptions) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return options?.limit ? mockProposals.slice(0, options.limit) : mockProposals;
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

// React Query options
export const raidDataOptions = (raidId: string) =>
  queryOptions({
    queryKey: ["raid", raidId, "data"] as const,
    queryFn: () => fetchRaidData(raidId),
  });

export const safeDataOptions = (raidId: string) =>
  queryOptions({
    queryKey: ["raid", raidId, "safe"] as const,
    queryFn: () => fetchSafeData(raidId),
  });

export const userRaidDataOptions = (
  raidId: string,
  address: string | undefined
) =>
  queryOptions({
    queryKey: ["raid", raidId, "userData", address] as const,
    queryFn: () => fetchUserRaidData(raidId, address),
  });

export const initialAllocationOptions = (raidId: string) =>
  queryOptions({
    queryKey: ["raid", raidId, "allocation"] as const,
    queryFn: () => fetchInitialAllocation(raidId),
  });

export const proposalsOptions = (raidId: string, options?: ProposalsOptions) =>
  queryOptions({
    queryKey: ["raid", raidId, "proposals", options] as const,
    queryFn: () => fetchProposals(raidId, options),
  });

export const proposalOptions = (raidId: string, proposalId: string) =>
  queryOptions({
    queryKey: ["raid", raidId, "proposals", proposalId] as const,
    queryFn: () => fetchProposal(raidId, proposalId),
  });
