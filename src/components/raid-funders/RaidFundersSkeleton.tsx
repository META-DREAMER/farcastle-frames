import { Skeleton } from "@/components/ui/skeleton";

export function RaidFundersSkeleton() {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold">Funders</h2>
        <span className="text-muted-foreground font-medium">Shares</span>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <ul className="divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center space-x-2 py-2 px-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex-grow">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-8" />
              </div>
            </li>
          ))}
          <li>
            <div className="flex items-center w-full py-2 px-3">
              <div className="flex -space-x-2 mr-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <Skeleton className="h-4 w-16 ml-2" />
              <div className="flex ml-auto items-center space-x-2">
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
