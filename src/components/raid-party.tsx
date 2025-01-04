import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { type RaidMember } from "@/app/api/mockRaidApi";
import { motion } from "motion/react";

interface RaidPartyProps {
  members: RaidMember[];
}

export function RaidParty({ members }: RaidPartyProps) {
  return (
    <motion.section layout className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl font-bold">Raid Party</h2>
        <Button variant="secondary">Join</Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {members.map((member) => (
          <Link
            href={`/user/${member.id}`}
            scroll={false}
            key={member.id}
            className="h-full"
          >
            <Card className="border shadow-none transition-colors hover:bg-muted h-full">
              <CardContent className="p-3 flex items-start space-x-3 h-full">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1 min-w-0 flex flex-col justify-between h-full">
                  <p className="text-sm font-medium leading-none truncate">
                    {member.name}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {member.roles.map((role, roleIndex) => (
                      <Badge
                        key={roleIndex}
                        variant={role === "Leader" ? "default" : "secondary"}
                        className={`text-[10px] sm:text-[11px] px-1.5 py-0 font-medium ${
                          role === "Leader"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
