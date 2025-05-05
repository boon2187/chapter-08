"use client";

import { useEffect, useState } from "react";
import { Post } from "../types";
import Link from "next/link";
import Card from "@/components/Card";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
        );
        const data = await response.json();
        console.log("取得したポストデータ", data.posts);
        setPosts(data.posts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">読み込み中...</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-10">
      <ul className="flex-1 w-full flex flex-col items-center">
        {posts.map((post) => (
          <li key={post.id} className="mb-t w-1/2 p-4">
            <Link href={`/posts/${post.id}`}>
              <Card post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
