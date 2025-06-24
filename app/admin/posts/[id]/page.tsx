"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/app/_components/Input";
import Label from "@/app/_components/Label";
import Textarea from "@/app/_components/Textarea";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { category: Category }[];
}

export default function AdminPostEdit() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/admin/posts/${id}`);
          if (!res.ok) {
            throw new Error("記事の取得に失敗しました");
          }
          const data = await res.json();
          const post: Post = data.post;
          setTitle(post.title);
          setContent(post.content);
          setThumbnailUrl(post.thumbnailUrl);
          if (post.postCategories.length > 0) {
            setSelectedCategoryIds(
              post.postCategories.map((pc) => pc.category.id)
            );
          }
        } catch (error) {
          console.error(error);
          router.push("/admin/posts");
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) {
          throw new Error("カテゴリーの取得に失敗しました");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
    fetchCategories();
  }, [id, router]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategoryIds((prev) =>
      e.target.checked
        ? [...prev, categoryId]
        : prev.filter((id) => id !== categoryId)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("更新ボタンがクリックされました");
  };

  const handleDelete = async () => {
    console.log("削除ボタンがクリックされました");
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8">記事編集</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            showValidation={false}
          />
        </div>
        <div>
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48"
            showValidation={false}
          />
        </div>
        <div>
          <Label htmlFor="thumbnailUrl">サムネイルURL</Label>
          <Input
            id="thumbnailUrl"
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full"
            showValidation={false}
          />
        </div>
        <div>
          <Label htmlFor="category">カテゴリー</Label>
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  id={`category-${category.id}`}
                  type="checkbox"
                  value={category.id}
                  checked={selectedCategoryIds.includes(category.id)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-gray-900"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            更新
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
}
