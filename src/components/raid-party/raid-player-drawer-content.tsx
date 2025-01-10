"use client";

import {
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { raidMemberProfileOptions } from "@/app/api/mockRaidApi";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { truncateAddress } from "@/lib/truncateAddress";

interface RaidPlayerDrawerContentProps {
  userId: string;
  raidId: string;
  children?: React.ReactNode;
}

export function RaidPlayerDrawerContent({
  userId,
  raidId,
  children,
}: RaidPlayerDrawerContentProps) {
  const { data: profile } = useSuspenseQuery(
    raidMemberProfileOptions(raidId, userId)
  );

  if (!profile.member) return null;

  const ownershipPercentage = profile.funder
    ? ((profile.funder.shares / profile.funder.totalShares) * 100).toFixed(1)
    : "0";

  return (
    <div className="mx-auto w-full max-w-xl">
      <DrawerHeader className="px-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={profile.member.avatar}
              alt={profile.member.name}
            />
            <AvatarFallback>{profile.member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <DrawerTitle className="text-2xl text-left font-heading font-bold">
              {profile.member.name}
            </DrawerTitle>
            {profile.funder && (
              <p className="text-sm font-mono text-muted-foreground">
                {truncateAddress(profile.funder.address)}
              </p>
            )}
          </div>
        </div>
      </DrawerHeader>

      <div className="px-6 space-y-6">
        {profile.funder && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Ownership
              </h3>
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold font-mono">
                    {profile.funder.shares}
                  </p>
                  <p className="text-sm text-muted-foreground">Shares</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-2xl font-bold font-mono">
                    {ownershipPercentage}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    of total shares
                  </p>
                </div>
              </div>
            </div>

            <Separator />
          </>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Roles & Responsibilities
          </h3>
          <ul className="space-y-4">
            {profile.member.roles.map((role) => (
              <li key={role.name} className="space-y-1">
                <h4 className="font-medium">{role.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {role.responsibility}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {children}
      </div>

      <DrawerFooter className="px-6">
        <Link href={`/user/${userId}`} className="w-full">
          <Button className="w-full" size="lg">
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </DrawerFooter>
    </div>
  );
}
