"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

async function saveRemoveJobAction(jobID: string) {
  const session = await auth();

  // Ensure the user is authenticated
  if (!session || !session.user.id) {
    return { error: "User ID is required" };
  }

  // Check if the job is already bookmarked
  const isBookmarked = await prisma.savedJob.findFirst({
    where: {
      jobId: jobID,
      userId: session.user.id,
    },
  });

  let message: string;

  // If the job is already bookmarked, remove it
  if (isBookmarked) {
    await prisma.savedJob.delete({
      where: {
        id: isBookmarked.id,
      },
    });
    message = "Job removed from bookmarks.";
  } else {
    // If the job is not bookmarked, add it
    await prisma.savedJob.create({
      data: {
        jobId: jobID,
        userId: session.user.id,
      },
    });
    message = "Job added to bookmarks.";
  }

  // Revalidate the bookmarked jobs page to reflect changes
  try {
    //revalidatePath("/pages/jobs", "page");
    revalidateTag("saved-jobs");
    console.log("Revalidated the saved jobs page.");
  } catch (err) {
    console.error("Failed to revalidate saved jobs page:", err);
  }

  // Return the appropriate message and the new bookmark status
  return { message, isBookmarked: !isBookmarked };
}

export default saveRemoveJobAction;
