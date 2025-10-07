import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();

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

    const articles = await prisma.article.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (e) {
    console.error(`Error while fetching articles in api`, e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
