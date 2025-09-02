import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const Prisma = new PrismaClient();
export const GET = async (req : Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'ID is required' }), {
      status: 400,
    });
  }

  try {
    const Statement = await Prisma.articleStatement.findUnique({
        where: { id },
    })

    return new NextResponse(JSON.stringify(Statement), {
      status: 200,
    });
  } catch (e) {
    console.log(`Error while fetching statement of id ${id} in api`, e);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
