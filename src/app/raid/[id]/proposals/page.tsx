import { Metadata } from "next";
import { RaidProposals } from "./RaidProposals";
const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const frame = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: "View Proposals",
    action: {
      type: "launch_frame",
      name: "Raid Proposals",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Raid Proposals",
    openGraph: {
      title: "Raid Proposals",
      description: "proposals for the raid",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function ProposalsPage({ params }: Props) {
  const { id: raidId } = params;
  return <RaidProposals raidId={raidId} />;
}
