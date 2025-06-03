import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事一覧の取得API(GET)
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = parseInt(params.id);
    // URLパラメータのバリデーション
    if (isNaN(id)) {
      return NextResponse.json(
        { status: "error", message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // DBから記事一覧を取得
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
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
    });

    // 記事が見つからなかった場合
    if (!post) {
      return NextResponse.json(
        { status: "error", message: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
