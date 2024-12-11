import { Metadata } from "next";
import { LootAllocation } from "./LootAllocation";
import { getQueryClient } from "@/app/get-query-client";
import { initialAllocationOptions } from "@/app/api/mockRaidApi";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: Promise<{
    raidId: string;
  }>;
}

const frame = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "Farcaster Frames v2 Demo",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Farcaster Frames v2 Demo",
    openGraph: {
      title: "Farcaster Frames v2 Demo",
      description: "A Farcaster Frames v2 demo app.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function Home({ params }: Props) {
  const { raidId } = await params;
  const queryClient = getQueryClient();

  // Prefetch initial allocation on server
  await queryClient.prefetchQuery(initialAllocationOptions(raidId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LootAllocation raidId={raidId} />
    </HydrationBoundary>
  );
}
