import { z } from "zod";
import { contactFormSchema } from "../_schemas/ContactForm";

// 日付を表す型
export type DateType = Date | string;

// 記事データの型
export interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: DateType;
  categories: string[];
  content: string;
}

export interface MicroCmsPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: { id: string; name: string }[];
  thumbnail: { url: string; height: number; width: number };
}

// スキーマから型を推論
export type ContactFormData = z.infer<typeof contactFormSchema>;
