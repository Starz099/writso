import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Await the params in Next.js 15
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const statement = await prisma.articleStatement.findUnique({
      where: { id },
    });

    if (!statement) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(statement, { status: 200 });
  } catch (e) {
    console.error(`Error while fetching statement of id ${id} in api`, e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
