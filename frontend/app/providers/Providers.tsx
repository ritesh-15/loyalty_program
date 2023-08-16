"use client"

import { QueryClientProvider, QueryClient } from "react-query"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useWallet } from "../store/WalletStore"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface IProps {
  children: React.ReactNode
}

let eth: any = null

if (typeof window !== "undefined") {
  eth = (window as any).ethereum
}

const client = new QueryClient()

export default function Providers({ children }: IProps) {
  const { checkIfWalletConnected, connectWallet, walletAddress } = useWallet()

  useEffect(() => {
    checkIfWalletConnected()

    eth.on("connect", connectWallet)

    return () => {
      eth.removeListener("connect", () => {})
    }
  }, [eth])

  return (
    <>
      <Toaster />
      <SessionProvider>
        <QueryClientProvider client={client}>
          <>{children}</>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
