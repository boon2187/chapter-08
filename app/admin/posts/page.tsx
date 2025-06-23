"use client";

import React, { useEffect, useState } from "react";
import { Post, PostCategory, Category } from "@prisma/client";

type PostWithCategories = Post & {
  postCategories: (PostCategory & { category: Category })[];
};

export default function AdminHome() {
  const [posts, setPosts] = useState<PostWithCategories[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/admin/posts");
        const data = await res.json();
        if (data.status === "OK") {
          setPosts(data.posts);
        } else {
          console.error("記事の取得に失敗しました", data.status);
        }
      } catch (error) {
        console.error("記事の取得中にエラーが発生しました", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-extrabold mb-8">記事一覧</h2>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-200 mb-6 pb-6">
            <div className="font-bold text-xl">{post.title}</div>
            <div className="text-gray-500 text-base">
              {new Date(post.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
