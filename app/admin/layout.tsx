import React from "react";
import AdminSidebar from "../_components/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-gray-50">
        <AdminSidebar />
      </div>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
