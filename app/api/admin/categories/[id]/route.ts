import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// カテゴリの詳細取得API(GET)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};
