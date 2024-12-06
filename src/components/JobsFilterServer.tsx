import { redirect } from "next/navigation";

// lib
import { prisma } from "@/lib/prisma";
import { jobFilterSchema, JobFilterValues } from "@/schemas";

// components
import Select from "./Select";
import FormSubmitButton from "./FormSubmitButton";

const WorkModeArray = [
  "All",
  "On-Site",
  "Remote",
  "Hybrid",
  "Flexible",
  "Contract",
];

const WorkTypeArray = ["Full-Time", "Part-Time", "Internship"];

interface JobFilterProps {
  defaultValues: JobFilterValues;
}

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { search, type, location, workMode } = jobFilterSchema.parse(values);

  console.log(search, type, location, workMode);

  const searchParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(workMode && { workMode }),
  });

  redirect(`/pages/jobs/?${searchParams.toString()}`);
}

async function clearFilters() {
  "use server";
  redirect(`/pages/jobs/`);
}

export default async function JobsFilterServer({
  defaultValues,
}: JobFilterProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location)
    )) as string[];

  const isFilter =
    defaultValues.search ||
    defaultValues.type ||
    defaultValues.location ||
    defaultValues.workMode;

  return (
    <div className="bg-white shadow-md p-4 mr-4 hidden md:block w-[300px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="font-medium">
            Search
          </label>
          <input
            id="search"
            name="search"
            placeholder="Company / Designation / Skill"
            defaultValue={defaultValues.search || ""}
            className="border border-slate-300 focus:ring-2 focus:outline-none focus:ring-ring focus:ring-offset-2 px-4 py-2 placeholder:text-sm"
          />
        </div>

        {/* Work Type Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="type" className="font-medium">
            Work Type
          </label>
          <Select
            id="type"
            name="type"
            defaultValue={defaultValues.type || ""}
            className="border border-slate-300"
          >
            <option value="">All</option>
            {WorkTypeArray.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        {/* Location Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="location" className="font-medium">
            Location
          </label>
          <Select
            id="location"
            name="location"
            defaultValue={defaultValues.location || ""}
            className="border border-slate-300"
          >
            <option value="">All</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>

        {/* Work Mode Select */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="workMode" className="font-medium">
            Work Mode
          </label>
          <Select
            id="workMode"
            name="workMode" // Ensure this matches the schema field
            defaultValue={defaultValues.workMode || ""}
            className="border border-slate-300"
          >
            <option value="">All</option>
            {WorkModeArray.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </div>

        <FormSubmitButton className="mt-4 w-full border border-violet-600 bg-violet-600 text-white hover:bg-violet-500 px-4 transition">
          Filter jobs
        </FormSubmitButton>
      </form>
      <form action={clearFilters}>
        {isFilter && (
          <FormSubmitButton className="mt-2 w-full border border-red-600 bg-red-50 text-red-600 hover:bg-red-100 px-4 transition">
            Clear filters
          </FormSubmitButton>
        )}
      </form>
    </div>
  );
}
