"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types";
// import { format } from "date-fns";
// import DOMPurify from "dompurify";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${params.id}`
        );
        const data = await response.json();
        setPost(data.post);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">読み込み中...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col max-w-[800px] mt-12 mx-auto">
        <p>記事が見つかりませんでした。</p>
      </div>
    );
  }

  return <div>{post.title}</div>;
}
