import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

    const comments = await prisma.comment.findMany({
      where: {
        articleId: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true, // username field from User
            email: true, // you can include more if needed
          },
        },
      },
    });

    return NextResponse.json({
      comments,
      message: `Comments fetched for article id ${id}`,
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

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

    const articleId = id;
    const { content } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: userId,
      },
    });

    return NextResponse.json({
      comment,
      message: "Comment added",
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
