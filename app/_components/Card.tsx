"use client";

import { format } from "date-fns";
import DOMPurify from "dompurify";
import { MicroCmsPost } from "../_types";
import Image from "next/image";

export default function Card({ post }: { post: MicroCmsPost }) {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  return (
    <div className="border border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <div>{format(new Date(post.createdAt), "yyyy/M/d")}</div>
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
      <div className="text-left mt-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <Image
          src={post.thumbnail.url}
          alt={post.title}
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}
