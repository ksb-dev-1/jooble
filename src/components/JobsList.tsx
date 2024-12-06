import { JobFilterValues } from "@/schemas";

// components
import JobCard from "@/components/JobCard";
import Pagination from "./Pagination";

interface JobsListProps {
  filterValues: JobFilterValues;
}

export async function fetchJobs(filterValues: JobFilterValues) {
  const { search, type, location, workMode, page } = filterValues;

  const queryParams = new URLSearchParams({
    ...(search && { search }),
    ...(type && { type }),
    ...(location && { location }),
    ...(workMode && { workMode }),
    ...(page && { page }),
    limit: "5",
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${queryParams.toString()}`,
    { next: { tags: ["jobs"] } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data;
}

export default async function JobsList({ filterValues }: JobsListProps) {
  let jobs: Job[] = [];
  let totalPages: number = 1;

  try {
    const data = await fetchJobs(filterValues);
    jobs = data.jobs;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <>
      {jobs.length > 0 ? (
        <div className="w-full">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        <p>No jobs found</p>
      )}
    </>
  );
}
