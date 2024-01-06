import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A2z Ai Assistant",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SessionProvider session={session}>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
