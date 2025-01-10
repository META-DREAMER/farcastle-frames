import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Suspense } from "react";
import { RaidPlayerDrawerContent } from "./raid-player-drawer-content";
import { RaidPlayerDrawerSkeleton } from "./raid-player-drawer-skeleton";
import { X } from "lucide-react";

interface RaidPlayerDrawerProps {
  userId: string;
  raidId: string;
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RaidPlayerDrawer({
  userId,
  raidId,
  children,
  open,
  onOpenChange,
}: RaidPlayerDrawerProps) {
  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="absolute left-4 top-4">
          <DrawerClose className="rounded-sm opacity-30 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </div>
        <Suspense fallback={<RaidPlayerDrawerSkeleton />}>
          <RaidPlayerDrawerContent userId={userId} raidId={raidId}>
            {children}
          </RaidPlayerDrawerContent>
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
}
