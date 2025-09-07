import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return NextResponse.json({ message: "Get method in article route" });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Await the params in Next.js 15
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const { content, userEmail } = await request.json();

    const userId = (
      await prisma.user.findFirst({
        where: { email: userEmail },
      })
    )?.id;

    console.log("userid", userId);
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.article.create({
      data: {
        title: "untitled",
        userId: userId,
        content: content,
        statementId: id,
      },
    });

    return NextResponse.json(
      { message: "Article submitted successfully" },
      { status: 200 },
    );
  } catch (e) {
    console.error(`Error while posting article in api`, e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
