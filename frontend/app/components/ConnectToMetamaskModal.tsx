import Image from "next/image"
import React from "react"
import Button from "./button/Button"
import { useWallet } from "../store/WalletStore"

export default function ConnectToMetamaskModal() {
  const { connectWallet, isConnected, walletAddress } = useWallet()

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl font-bold">Let&aposs connect your metamask</h1>
      <p className="text-center max-w-[75%] mt-2">
        To get access of rewards and purchase product through the tokens you
        will require to connect your meta mask
      </p>

      <Image alt="" src="/assets/metamask_logo.png" width={150} height={150} />

      <Button onClick={connectWallet} className="mt-4  w-fit mx-auto">
        Connect Your Wallet
      </Button>
    </div>
  )
}
