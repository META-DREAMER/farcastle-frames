import { UserProfileDrawer } from "@/components/user-profile-drawer";

interface UserProfileInterceptProps {
  params: Promise<{
    userId: string;
    id: string; // raid id
  }>;
}

export default async function UserProfileIntercept({
  params,
}: UserProfileInterceptProps) {
  const { userId } = await params;
  return (
    <UserProfileDrawer userId={userId}>
      <div className="px-6 space-y-4">
        <h2 className="text-xl font-semibold">User Profile INTERCEPT</h2>
      </div>
    </UserProfileDrawer>
  );
}
