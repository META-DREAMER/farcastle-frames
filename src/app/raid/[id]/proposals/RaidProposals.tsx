"use client";

import { Card } from "~/components/ui/card";
import { useProposals } from "~/app/api/mockRaidApi";
import { ProposalRow } from "~/components/proposal-row";
import { Skeleton } from "~/components/ui/skeleton";

export function RaidProposals({ raidId }: { raidId: string }) {
  const { data: proposals = [], isLoading, error } = useProposals(raidId);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <div className="p-6">
          <h1 className="text-3xl font-heading font-bold mb-6">
            {error ? (
              <span className="text-red-500">Error Loading Proposals</span>
            ) : (
              "All Proposals"
            )}
          </h1>

          {error ? (
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          ) : (
            <div className="border rounded-lg bg-card overflow-hidden">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {proposals.map((proposal) => (
                    <ProposalRow
                      key={proposal.id}
                      proposal={proposal}
                      raidId={raidId}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
