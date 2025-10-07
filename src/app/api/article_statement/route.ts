import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statements = await prisma.articleStatement.findMany({});
    return NextResponse.json({
      statements,
      message: "All article statements on writso",
    });
  } catch (e) {
    console.log("Error while fetching all article statements", e);
  }
}
