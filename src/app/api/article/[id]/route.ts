import calc from "@/lib/calculateScore";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json({ message: "Get method in article/id route" });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const { title, content, userEmail } = await request.json();

    const userId = (
      await prisma.user.findFirst({
        where: { email: userEmail },
      })
    )?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const score = await calc(content as string);

    if (id === "freestyle") {
      const article = await prisma.article.create({
        data: {
          title: title,
          userId: userId,
          content: content,
          score: score,
        },
      });

      return NextResponse.json(
        { message: "Article submitted successfully", id: article.id },
        { status: 200 },
      );
    }

    const article = await prisma.article.create({
      data: {
        title: title,
        userId: userId,
        content: content,
        score: score,
        statementId: id,
      },
    });

    return NextResponse.json(
      { message: "Article submitted successfully", id: article.id },
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
