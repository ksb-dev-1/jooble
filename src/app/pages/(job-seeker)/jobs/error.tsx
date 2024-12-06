// app/jobs/error.tsx

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error in Jobs page:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-[calc(72px+4rem)] pb-[4rem]">
      <div className="max-w-6xl px-4 flex flex-col items-center">
        <h1 className="font-bold text-xl text-red-500 mb-4">
          Something went wrong
        </h1>
        <p className="mb-4">
          We encountered an issue while loading the jobs. Please try again
          later.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
