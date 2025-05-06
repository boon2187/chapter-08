"use client";

import Input from "@/components/Input";
import Label from "@/components/Label";
import Textarea from "@/components/Textarea";
import { contactFormSchema } from "@/schemas/ContactForm";
import { ContactFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const [showValidation, setShowValidation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: ContactFormData) => {
    setShowValidation(false);

    try {
      const requestBody = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      console.log("送信データ:", requestBody);

      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("APIレスポンス:", responseData);

      alert("送信しました");
      reset();
    } catch (error: unknown) {
      console.error("送信エラー:", error);
      // エラーオブジェクトを適切に型チェック
      if (error instanceof Error) {
        alert(`送信に失敗しました: ${error.message}`);
      } else {
        alert("送信に失敗しました");
      }
    }
  };

  const handleClear = () => {
    reset();
    setShowValidation(false);
  };

  const onError = () => {
    setShowValidation(true);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-1/2 p-4">
        <h1 className="text-xl font-bold mb-6">お問い合わせ</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
          <div className="flex items-center">
            <Label htmlFor="name">お名前</Label>
            <Input
              id="name"
              {...register("name")}
              disabled={isSubmitting}
              showValidation={showValidation}
              error={errors.name?.message}
            />
          </div>

          <div className="flex items-center">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              showValidation={showValidation}
              error={errors.email?.message}
            />
          </div>

          <div className="flex">
            <Label htmlFor="message" className="pt-2">
              本文
            </Label>
            <Textarea
              id="message"
              rows={5}
              {...register("message")}
              disabled={isSubmitting}
              showValidation={showValidation}
              error={errors.message?.message}
            />
          </div>

          <div className="pt-5 flex gap-3 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-5 bg-black text-white font-bold rounded-lg hover:bg-gray-600 focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? "送信中..." : "送信"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="py-2 px-5 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 focus:outline-none disabled:opacity-50"
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
