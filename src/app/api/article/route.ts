import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
import { getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]"; // Your NextAuth.js configuration

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession();
    console.log("Session in api", session);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // const userId = (await prisma.user.findFirst())?.id;

    // const userId = "cmevcp2ge0000uvgkrrilmvuu";
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

    return NextResponse.json(articles, { status: 200 });
  } catch (e) {
    console.error(`Error while fetching articles in api`, e);
  }
}
