import { Skeleton } from "@/components/ui/skeleton";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function RaidPlayerDrawerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <DrawerHeader className="px-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-1">
            <DrawerTitle className="text-2xl text-left font-heading font-bold">
              <Skeleton className="h-8 w-48" />
            </DrawerTitle>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </DrawerHeader>

      <div className="px-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-baseline justify-between">
            <div className="space-y-1">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="text-right space-y-1">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Skeleton className="h-4 w-48" />
          <ul className="space-y-4">
            {[1, 2].map((i) => (
              <li key={i} className="space-y-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-64" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DrawerFooter className="px-6">
        <Button className="w-full" size="lg" disabled>
          View Profile
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </DrawerFooter>
    </div>
  );
}
