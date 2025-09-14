import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
