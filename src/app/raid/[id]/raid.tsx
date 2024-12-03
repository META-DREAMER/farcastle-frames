"use client";

import dynamic from "next/dynamic";

const RaidHomepage = dynamic(() => import("~/components/RaidHomepage"), {
  ssr: false,
});

export default function Raid(
  { raidId }: { raidId: string }
) {
  return <RaidHomepage raidId={raidId} />;
}
