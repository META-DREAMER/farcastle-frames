"use client";

import { Card } from "@/components/ui/card";
import { proposalsOptions, type Proposal } from "@/app/api/mockRaidApi";
import { ProposalRow } from "@/components/proposal-row";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProposalsContent({ raidId }: { raidId: string }) {
  const { data: proposals } = useSuspenseQuery(proposalsOptions(raidId));

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <ul className="divide-y divide-border">
        {proposals.map((proposal: Proposal) => (
          <ProposalRow key={proposal.id} proposal={proposal} raidId={raidId} />
        ))}
      </ul>
    </div>
  );
}
function ProposalsSkeleton() {
  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="p-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}

export function RaidProposals({ raidId }: { raidId: string }) {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <div className="p-6">
          <h1 className="text-3xl font-heading font-bold mb-6">
            All Proposals
          </h1>
          <Suspense fallback={<ProposalsSkeleton />}>
            <ProposalsContent raidId={raidId} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}
