import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locations = await prisma.job.findMany({
      select: { location: true },
      distinct: ["location"],
    });

    const distinctLocations = locations.map(({ location }) => location);

    return NextResponse.json({ locations: distinctLocations });
  } catch (error) {
    console.error("Error fetching distinct locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch distinct locations" },
      { status: 500 }
    );
  }
}
