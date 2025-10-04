import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (
      await prisma.user.findFirst({
        where: { email: session?.user?.email },
      })
    )?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const submissions = await prisma.article.findMany({
      where: {
        userId: userId,
        statementId: id,
      },
    });

    return NextResponse.json({
      submissions,
      message: `articles fetched for article id ${id}`,

      status: 200,
    });
  } catch (e) {
    console.error(`Error while fetching articles in api`, e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
