import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const Prisma = new PrismaClient();
export const GET = async() => {
    try {
        const StatementOfTheDay = await Prisma.articleStatement.findMany();
    
        return new NextResponse(JSON.stringify(StatementOfTheDay[0]), { status: 200 });
    } catch (e) {
        console.log("Error while fetching statement of the day in api", e);
    }
}