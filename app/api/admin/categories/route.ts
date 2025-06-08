import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// カテゴリの型のinterface
interface CreateCategoryRequestBody {
  name: string;
}

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    // リクエストボディを取得
    const body = await request.json();

    // bodyからnameを取得
    const { name }: CreateCategoryRequestBody = body;

    // カテゴリを作成
    const data = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};
