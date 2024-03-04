import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Welcome to LMS",
  description: "Leave management system dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="min-h-screen bg-slate-200 pt-16 sm:pl-64">
        {children}
      </main>
    </>
  );
}
