import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const Prisma = new PrismaClient();
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  try {
    const Statement = await Prisma.articleStatement.findUnique({
      where: { id },
    });

    return new NextResponse(JSON.stringify(Statement), {
      status: 200,
    });
  } catch (e) {
    console.log(`Error while fetching statement of id ${id} in api`, e);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      },
    );
  }
};
