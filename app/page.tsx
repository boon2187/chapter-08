"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MicroCmsPost } from "./_types";
import Card from "./_components/Card";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://dnhdijq6eh.microcms.io/api/v1/posts",
          {
            headers: {
              "X-MICROCMS-API-KEY":
                process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
            },
          }
        );
        const { contents } = await response.json();
        setPosts(contents);
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
