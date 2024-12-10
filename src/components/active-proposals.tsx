import Link from "next/link";
import { ChevronRight, Users, Coins, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

interface Proposal {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
  };
  type: "funding" | "newMember" | "signal";
  votes: {
    for: number;
    against: number;
  };
  timeLeft: string;
}

interface ActiveProposalsProps {
  raidId: string;
  proposals: readonly Proposal[];
}

function getProposalTypeIcon(type: Proposal["type"]) {
  switch (type) {
    case "funding":
      return <Coins className="h-4 w-4 text-yellow-500" />;
    case "newMember":
      return <Users className="h-4 w-4 text-blue-500" />;
    case "signal":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
  }
}

function getProposalTypeName(type: Proposal["type"]) {
  switch (type) {
    case "funding":
      return "Funding";
    case "newMember":
      return "Member";
    case "signal":
      return "Signal";
  }
}

export function ActiveProposals({ raidId, proposals }: ActiveProposalsProps) {
  const displayProposals = proposals.slice(0, 3);

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-heading font-bold">Active Proposals</h2>
        <Button variant="ghost" asChild className="pr-0">
          <Link href={`/raids/${raidId}/proposals`}>
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {displayProposals.map((proposal) => (
            <li key={proposal.id}>
              <Link href={`/raids/${raidId}/proposals/${proposal.id}`}>
                <div className="flex justify-between items-center py-4 px-4 hover:bg-muted transition-colors">
                  <div className="flex-grow">
                    <h3 className="font-medium">{proposal.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage
                          src={proposal.creator.avatar}
                          alt={proposal.creator.name}
                        />
                        <AvatarFallback>
                          {proposal.creator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{proposal.creator.name}</span>
                      <span className="mx-2">•</span>
                      {getProposalTypeIcon(proposal.type)}
                      <span className="ml-1">
                        {getProposalTypeName(proposal.type)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <div className="text-sm font-medium">
                        <span className="text-green-600">
                          {proposal.votes.for} For
                        </span>{" "}
                        /{" "}
                        <span className="text-red-600">
                          {proposal.votes.against} Against
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {proposal.timeLeft} left to vote
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
