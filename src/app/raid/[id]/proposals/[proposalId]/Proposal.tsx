"use client";

import { Card } from "~/components/ui/card";
import { useProposal } from "~/app/api/mockRaidApi";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  getProposalTypeIcon,
  getProposalTypeName,
} from "~/components/proposal-row";
import { Skeleton } from "~/components/ui/skeleton";

interface ProposalProps {
  raidId: string;
  proposalId: string;
}

export function Proposal({ raidId, proposalId }: ProposalProps) {
  const { data: proposal, isLoading, error } = useProposal(raidId, proposalId);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <div className="p-6">
          {error ? (
            <div>
              <h1 className="text-3xl font-heading font-bold mb-6 text-red-500">
                Error Loading Proposal
              </h1>
              <p className="text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong"}
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : proposal ? (
            <div>
              <h1 className="text-3xl font-heading font-bold mb-6">
                {proposal.title}
              </h1>

              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={proposal.creator.avatar}
                    alt={proposal.creator.name}
                  />
                  <AvatarFallback>
                    {proposal.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{proposal.creator.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {getProposalTypeIcon(proposal.type)}
                    <span className="ml-1">
                      {getProposalTypeName(proposal.type)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {proposal.votes.for}
                    </div>
                    <div className="text-sm text-muted-foreground">For</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {proposal.votes.against}
                    </div>
                    <div className="text-sm text-muted-foreground">Against</div>
                  </div>
                </div>
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  {proposal.timeLeft} left to vote
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{proposal.description}</p>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
