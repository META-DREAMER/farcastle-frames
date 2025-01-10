import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type RaidMember } from "@/app/api/mockRaidApi";
import { RaidPlayerCard } from "./raid-player-card";

interface RaidPartySkeletonProps {
  members?: RaidMember[] | null;
}

export function RaidPartySkeleton({ members }: RaidPartySkeletonProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl font-bold">Raid Party</h2>
        <Button variant="secondary">Join</Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {members ? (
          members.map((member) => (
            <RaidPlayerCard key={member.id} member={member} />
          ))
        ) : (
          <>
            {[1, 2].map((i) => (
              <Card
                key={i}
                className="border shadow-none transition-colors hover:bg-muted h-full"
              >
                <CardContent className="p-3 flex items-start space-x-3 h-full">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
