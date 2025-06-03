import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事一覧の取得API(GET)
export const GET = async () => {
  try {
    // DBから記事一覧を取得
    const posts = await prisma.post.findMany({
      include: {
        // カテゴリーも取得
        postCategories: {
          include: {
            category: {
              // select id, name from Category;
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      // 作成日時の降順で取得
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
