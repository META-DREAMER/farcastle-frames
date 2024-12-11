"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const RaidHomepage = dynamic(() => import("~/components/RaidHomepage"), {
  ssr: false,
});

export default function Raid({ raidId }: { raidId: string }) {
  return (
    <Suspense fallback={<div>Loading raid details...</div>}>
      <RaidHomepage raidId={raidId} />
    </Suspense>
  );
}
