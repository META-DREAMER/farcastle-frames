/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useMutation,
  queryOptions,
  type QueryKey,
  QueryClient,
} from "@tanstack/react-query";
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
const mockUserRaidData = {
  userShares: 100,
  userYeetInfo: {
    ethAmount: "690000000000000000",
    purchaseTimestamp: 1699000000, // Unix timestamp of purchase
  },
};

// Add mock raid info
const mockRaidInfo = {
  name: "Farcastle Genesis Merch Drop",
  description: "Design, produce and sell the genesis merch drop for Farcastle",
  fundingGoal: 1,
  currentFunding: 0.69,
  totalShares: 950,
  ethBalance: "18540296700000000000", // 10 ETH
  usdcBalance: "5249000000", // 5000 USDC (6 decimals)
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

// Mock API functions
const fetchRaidData = async (raidId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockRaidInfo;
};

const fetchUserRaidData = async (raidId: string, address: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return mockUserRaidData;
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

export const userRaidDataOptions = (raidId: string, address: string) =>
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
