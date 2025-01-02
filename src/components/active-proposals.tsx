import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProposalRow } from "./proposal-row";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type Proposal, proposalsOptions } from "@/app/api/mockRaidApi";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

interface ActiveProposalsProps {
  raidId: string;
}

export function ActiveProposalsSkeleton() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-heading font-bold">Active Proposals</h2>
        <Button variant="ghost" asChild className="pr-0">
          <span>
            View All
            <ChevronRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
      <div className="border rounded-lg bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ActiveProposals({ raidId }: ActiveProposalsProps) {
  const { data: proposals } = useSuspenseQuery(
    proposalsOptions(raidId, { limit: 3 })
  );

  return (
    <motion.div layout>
      <section className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-heading font-bold">Active Proposals</h2>
          <Button variant="ghost" asChild className="pr-0">
            <Link href={`/raid/${raidId}/proposals`}>
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="border rounded-lg bg-card overflow-hidden">
          <ul className="divide-y divide-border">
            {proposals.map((proposal: Proposal) => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
                raidId={raidId}
              />
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
  );
}
