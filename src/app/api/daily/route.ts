import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const StatementOfTheDay = await prisma.articleStatement.findMany();

    return new NextResponse(JSON.stringify(StatementOfTheDay[0]), {
      status: 200,
    });
  } catch (e) {
    console.log("Error while fetching statement of the day in api", e);
  }
};
