import { Suspense } from "react";
import { redirect } from "next/navigation";

// components
import SavedJobsSkeleton from "@/components/skeletons/SavedJobsSkeleton";
import SavedJobsList from "@/components/SavedJobsList";

// 3rd party
import { auth } from "@/auth";

export default async function SavedJobsPage() {
  const session = await auth();

  if (!session?.user.id) redirect("/pages/signin");
  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <Suspense fallback={<SavedJobsSkeleton />}>
          <SavedJobsList />
        </Suspense>
      </div>
    </div>
  );
}
