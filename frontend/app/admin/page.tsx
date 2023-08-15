"use client"

import React, { useEffect, useState } from "react"
import { FaBitcoin, FaCoins, FaEthereum } from "react-icons/fa"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"

export default function page() {
  const { walletAddress } = useWallet()
  const { getAccountBalance, totalSupply } = useLoyaltyContract()

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
  })

  useEffect(() => {
    ;(async () => {
      try {
        const [balance, supply] = await Promise.all([
          getAccountBalance(walletAddress),
          totalSupply(),
        ])
        setStats({
          accountBalance: ethers.formatEther(`${balance}`),
          supply: ethers.formatEther(supply.toString()),
        })
      } catch (error: any) {
        toast.error("Something went wrong")
      }
    })()
  }, [walletAddress])

  return (
    <section className="mt-12 mx-4">
      <div className="">
        <h1 className="text-2xl font-bold">Loyalty Program</h1>
        <p className="">Manage the activity of the loyalty program</p>
      </div>

      <div className="grid grid-cols-3 mt-12 gap-6">
        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaCoins className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.accountBalance}</p>
          <span className="font-semibold">Total Supply</span>
        </div>

        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaEthereum className="text-5xl text-yellow-500" />
          <p className="mt-4">0.5 ETH</p>
          <span className="font-semibold">Token Value</span>
        </div>

        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaBitcoin className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.supply}</p>
          <span className="font-semibold">Total Supply</span>
        </div>
      </div>
    </section>
  )
}
