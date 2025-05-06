import { z } from "zod";
import { contactFormSchema } from "@/schemas/ContactForm";

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

// スキーマから型を推論
export type ContactFormData = z.infer<typeof contactFormSchema>;
