"use client"

import React, { useEffect, useState } from "react"
import { FaBitcoin, FaCoins, FaEthereum } from "react-icons/fa"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"
import { FiAnchor } from "react-icons/fi"

export default function page() {
  const { walletAddress } = useWallet()
  const { getAccountBalance, totalSupply, settlementTransactions } =
    useLoyaltyContract()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
  })

  useEffect(() => {
    if (!walletAddress) return
    ;(async () => {
      try {
        const [balance, supply] = await Promise.all([
          getAccountBalance(walletAddress),
          totalSupply(),
        ])

        const logs = await settlementTransactions()

        console.log(logs)

        setStats({
          accountBalance: ethers.formatEther(`${balance}`),
          supply: ethers.formatEther(supply.toString()),
        })
      } catch (error: any) {
        toast.error("Something went wrong")
      } finally {
        setLoading(false)
      }
    })()
  }, [walletAddress])

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <section className="mt-12 mx-4">
      <div className="">
        <h1 className="text-2xl font-bold">Loyalty Program</h1>
        <p className="">Manage the activity of the loyalty program</p>
      </div>

      <div className="grid grid-cols-2 mt-12 gap-6">
        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaCoins className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.accountBalance}</p>
          <span className="font-semibold">Total Supply</span>
        </div>

        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaBitcoin className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.supply}</p>
          <span className="font-semibold">Total Supply</span>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold">Settlement transactions</h1>
      </div>
    </section>
  )
}
