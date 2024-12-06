"use server";

import { redirect } from "next/navigation";

// lib
import { jobFilterSchema } from "@/schemas";

async function filterJobs(formData: FormData) {
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

export default filterJobs;
