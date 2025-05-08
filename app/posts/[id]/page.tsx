"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import Image from "next/image";
import { MicroCmsPost } from "@/app/_types";

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dnhdijq6eh.microcms.io/api/v1/posts/${params.id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY":
                process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
            },
          }
        );
        const data = await response.json();
        setPost(data);
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

  return (
    <div className="flex flex-col max-w-[800px] mt-12 mx-auto">
      {/* <img src={post.thumbnailUrl} alt={post.title} /> */}
      <Image
        src={post.thumbnail.url}
        alt={post.title}
        width={800}
        height={400}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between p-2">
          <div className="text-gray-500">
            {format(new Date(post.createdAt), "yyyy/M/d")}
          </div>
          <div className="flex gap-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="border border-blue-300 text-blue-500 p-1 rounded-md"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p
            className="mt-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>
      </div>
    </div>
  );
}
