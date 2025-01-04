interface UserProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { userId } = await params;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="space-y-4">
        <p>User ID: {userId}</p>
        {/* Add more user profile content here */}
      </div>
    </div>
  );
}
