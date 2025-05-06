import { z } from "zod";

// フォームのスキーマ定義
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "お名前は必須項目です" })
    .max(30, { message: "お名前は30文字以内で入力してください" }),
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須項目です" })
    .email({ message: "正しいメールアドレスの形式で入力してください" }),
  message: z
    .string()
    .min(1, { message: "内容は必須項目です" })
    .max(500, { message: "内容は500文字以内で入力してください" }),
});
