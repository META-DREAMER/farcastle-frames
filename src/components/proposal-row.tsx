import Link from "next/link";
import { ChevronRight, Users, Coins, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { type Proposal } from "@/app/api/mockRaidApi";

export function getProposalTypeIcon(type: Proposal["type"]) {
  switch (type) {
    case "funding":
      return <Coins className="h-4 w-4 text-yellow-500" />;
    case "newMember":
      return <Users className="h-4 w-4 text-blue-500" />;
    case "signal":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
}

export function getProposalTypeName(type: Proposal["type"]) {
  switch (type) {
    case "funding":
      return "Funding";
    case "newMember":
      return "Member";
    case "signal":
      return "Signal";
    default:
      return type;
  }
}

interface ProposalRowProps {
  proposal: Proposal;
  raidId: string;
}

export function ProposalRow({ proposal, raidId }: ProposalRowProps) {
  return (
    <li>
      <Button
        variant="ghost"
        className="w-full p-0 h-auto hover:bg-muted"
        asChild
      >
        <Link href={`/raid/${raidId}/proposals/${proposal.id}`}>
          <div className="flex justify-between items-center py-4 px-4 w-full">
            <div className="flex-grow">
              <h3 className="font-medium text-left">{proposal.title}</h3>
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
      </Button>
    </li>
  );
}
