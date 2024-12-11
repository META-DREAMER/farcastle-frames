"use client";

import { Card } from "~/components/ui/card";
import { proposalOptions } from "~/app/api/mockRaidApi";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  getProposalTypeIcon,
  getProposalTypeName,
} from "~/components/proposal-row";
import { Skeleton } from "~/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

interface ProposalProps {
  raidId: string;
  proposalId: string;
}

function ProposalContent({ raidId, proposalId }: ProposalProps) {
  const { data: proposal } = useSuspenseQuery(
    proposalOptions(raidId, proposalId)
  );

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-6">{proposal.title}</h1>

      <div className="flex items-center mb-6">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage
            src={proposal.creator.avatar}
            alt={proposal.creator.name}
          />
          <AvatarFallback>{proposal.creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{proposal.creator.name}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            {getProposalTypeIcon(proposal.type)}
            <span className="ml-1">{getProposalTypeName(proposal.type)}</span>
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
  );
}

function ProposalSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-3/4" />

      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-full mr-3" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
        </div>
        <Skeleton className="h-4 w-32 mx-auto mt-4" />
      </div>

      <Skeleton className="h-32 w-full" />
    </div>
  );
}

export function Proposal(props: ProposalProps) {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <div className="p-6">
          <Suspense fallback={<ProposalSkeleton />}>
            <ProposalContent {...props} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}
