import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type RaidMember } from "@/app/api/mockRaidApi";

interface RaidPlayerCardProps {
  member: RaidMember;
  onClick?: (memberId: string) => void;
}

export function RaidPlayerCard({ member, onClick }: RaidPlayerCardProps) {
  return (
    <Card
      key={member.id}
      className={`border shadow-none transition-colors hover:bg-muted h-full ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={() => onClick?.(member.id)}
    >
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
            {member.roles.map((role) => (
              <Badge
                key={role.name}
                variant={role.name === "Leader" ? "default" : "secondary"}
                className={`text-[10px] sm:text-[11px] px-1.5 py-0 font-medium ${
                  role.name === "Leader"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {role.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
