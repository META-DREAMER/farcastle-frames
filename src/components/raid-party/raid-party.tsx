"use client";

import { Button } from "@/components/ui/button";
import { raidPartyMembersOptions } from "@/app/api/mockRaidApi";
import { motion } from "motion/react";
import { RaidPlayerDrawer } from "./raid-player-drawer";
import { RaidPlayerCard } from "./raid-player-card";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

interface RaidPartyProps {
  raidId: string;
}

export function RaidParty({ raidId }: RaidPartyProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: members } = useSuspenseQuery(raidPartyMembersOptions(raidId));

  const handleMemberClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsDrawerOpen(true);
  };

  return (
    <motion.section layout className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl font-bold">Raid Party</h2>
        <Button variant="secondary">Join</Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {members?.map((member) => (
          <RaidPlayerCard
            key={member.id}
            member={member}
            onClick={handleMemberClick}
          />
        ))}
      </div>
      {selectedMemberId && (
        <RaidPlayerDrawer
          userId={selectedMemberId}
          raidId={raidId}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />
      )}
    </motion.section>
  );
}
