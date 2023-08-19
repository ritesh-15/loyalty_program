import "./globals.css"
import React, { Suspense } from "react";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
const Navbar = React.lazy(()=>import('@/app/components/Navbar'))
import Providers from "./providers/Providers"
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading/>}>
          <Navbar />
          {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
