import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事の型のinterface
interface CreatePostRequestBody {
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { categoryId: number }[];
}

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

// 記事の新規作成API(POST)
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const {
      title,
      content,
      thumbnailUrl,
      postCategories,
    }: CreatePostRequestBody = body;

    // DBへの保存をトランザクションでまとめて実行
    const result = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          title,
          content,
          thumbnailUrl,
        },
      });
      // SQLiteではcreateManyがサポートされていないため、Promise.allを使用
      await Promise.all(
        postCategories.map((category) =>
          tx.postCategory.create({
            data: {
              postId: post.id,
              categoryId: category.categoryId,
            },
          })
        )
      );

      return post;
    });

    return NextResponse.json({ status: "OK", post: result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};
