import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// カテゴリの型のinterface
interface UpdateCategoryRequestBody {
  name: string;
}

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

// カテゴリの更新API(PUT)
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await request.json();
    const { name }: UpdateCategoryRequestBody = body;
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};

// カテゴリの削除API(DELETE)
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};
