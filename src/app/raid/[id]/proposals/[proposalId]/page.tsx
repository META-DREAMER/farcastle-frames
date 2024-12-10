import { Metadata } from "next";
import { Proposal } from "./Proposal";
const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: Promise<{
    id: string;
    proposalId: string;
  }>;
}

const frame = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: "View Proposal",
    action: {
      type: "launch_frame",
      name: "Raid Proposal",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Raid Proposal",
    openGraph: {
      title: "Raid Proposal",
      description: "View proposal details",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function ProposalPage({ params }: Props) {
  const { id: raidId, proposalId } = await params;
  return <Proposal raidId={raidId} proposalId={proposalId} />;
}
