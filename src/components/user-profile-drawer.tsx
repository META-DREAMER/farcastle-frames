"use client";

import {
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfileDrawerProps {
  userId: string;
  children?: React.ReactNode;
}

export function UserProfileDrawer({
  userId,
  children,
}: UserProfileDrawerProps) {
  const router = useRouter();

  return (
    <Drawer
      shouldScaleBackground
      open={true}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          router.back();
        }
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerClose className="absolute left-4 top-4 rounded-sm opacity-30 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
          <DrawerHeader className="px-6">
            <DrawerTitle>User: {userId}</DrawerTitle>
            <DrawerDescription>User Bio</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
