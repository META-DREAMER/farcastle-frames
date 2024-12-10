import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ProposalRow } from "./proposal-row";
import { useProposals } from "~/app/api/mockRaidApi";

interface ActiveProposalsProps {
  raidId: string;
}

export function ActiveProposals({ raidId }: ActiveProposalsProps) {
  const { data: proposals, isLoading } = useProposals(raidId);

  if (isLoading) {
    return (
      <section className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-8 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="animate-pulse space-y-px">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!proposals) return null;

  const displayProposals = proposals.slice(0, 3);

  return (
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
          {displayProposals.map((proposal) => (
            <ProposalRow
              key={proposal.id}
              proposal={proposal}
              raidId={raidId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
