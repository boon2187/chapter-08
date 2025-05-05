"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 bg-gray-900 h-[72px]">
      <Link href="/" className="text-xl text-white">
        Blog
      </Link>
      <Link
        href="/contact"
        className="text-white bg-gray-900 mt-1 cursor-pointer"
      >
        お問い合わせ
      </Link>
    </header>
  );
}
