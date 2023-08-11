"use client"

import { QueryClientProvider, QueryClient } from "react-query"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"

interface IProps {
  children: React.ReactNode
}

const client = new QueryClient()

export default function Providers({ children }: IProps) {
  return (
    <>
      <Toaster />
      <SessionProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </SessionProvider>
    </>
  )
}
