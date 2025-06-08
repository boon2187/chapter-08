import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 記事の型のinterface
interface UpdatePostRequestBody {
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { categoryId: number }[];
}

// 記事の詳細取得API(GET)
export const GET = async (
  request: NextRequest,
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
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};

// 記事の更新API(PUT)
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      title,
      content,
      thumbnailUrl,
      postCategories,
    }: UpdatePostRequestBody = body;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, thumbnailUrl },
    });

    // 既存の関連を削除
    await prisma.postCategory.deleteMany({
      where: { postId: post.id },
    });

    // 記事のカテゴリーを更新
    await Promise.all(
      postCategories.map((category) =>
        prisma.postCategory.create({
          data: { postId: post.id, categoryId: category.categoryId },
        })
      )
    );

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: "Unknown error" }, { status: 500 });
  }
};

// 記事の削除API(DELETE)
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    await prisma.post.delete({
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
