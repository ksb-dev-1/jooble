import { Suspense } from "react";
import { redirect } from "next/navigation";

// schemas
import { JobFilterValues } from "@/schemas";

// 3rd party
import { auth } from "@/auth";

// components
import JobsList from "@/components/JobsList";
import JobsFilterServer from "@/components/JobsFilterServer";
import JobsSkeleton from "@/components/skeletons/JobsSkeleton";

interface JobsPageProps {
  searchParams: {
    search?: string;
    type?: string;
    location?: string;
    workMode?: string;
    page?: string;
  };
}

export default async function JobsPage({
  searchParams: { search, type, location, workMode, page },
}: JobsPageProps) {
  const session = await auth();

  if (!session?.user.id) redirect("/pages/signin");

  const filterValues: JobFilterValues = {
    search,
    type,
    location,
    workMode,
    page,
  };

  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4 flex flex-col">
        <Suspense fallback={<JobsSkeleton />}>
          <div className="flex flex-col md:flex-row items-start">
            <JobsFilterServer defaultValues={filterValues} />
            <JobsList filterValues={filterValues} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
