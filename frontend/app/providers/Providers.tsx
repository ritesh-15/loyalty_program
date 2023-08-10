"use client"

import { QueryClientProvider, QueryClient } from "react-query"
import { Toaster } from "react-hot-toast"

interface IProps {
  children: React.ReactNode
}

const client = new QueryClient()

export default function Providers({ children }: IProps) {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </>
  )
}
