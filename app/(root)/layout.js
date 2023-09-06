import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "../../components/shared/LeftSidebar";
import Bottombar from "../../components/shared/Bottombar";
import RightSidebar from "../../components/shared/RightSidebar";
import Topbar from "../../components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads",
  description : " A Next.js 13 Meta Threads Application"
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='main'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
