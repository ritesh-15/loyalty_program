"use client"

import React, { useEffect, useState } from "react"
import { FaBitcoin, FaCoins } from "react-icons/fa"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"
import { formatWalletAddress } from "../utils/formatWalletAddress"
import moment from "moment"

interface IIssuerTransaction {
  issuer: string
  tokens: string
  timestamp: string
  isAdded: boolean
}

export default function page() {
  const { walletAddress } = useWallet()
  const {
    getAccountBalance,
    totalSupply,
    issuerTransactions,
    numberOfIssuers,
  } = useLoyaltyContract()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
    issuersCount: "",
  })

  const [issuers, setIssuers] = useState<IIssuerTransaction[]>([])

  useEffect(() => {
    if (!walletAddress) return
    ;(async () => {
      try {
        const [balance, supply, issuersCount] = await Promise.all([
          getAccountBalance(walletAddress),
          totalSupply(),
          numberOfIssuers(),
        ])

        const logs = await issuerTransactions()

        setIssuers(
          logs.map(({ args }) => {
            return {
              issuer: formatWalletAddress(args[0]),
              tokens: ethers.formatEther(args[1].toString()),
              timestamp: args[2].toString(),
              isAdded: args[3],
            }
          })
        )

        setStats({
          accountBalance: ethers.formatEther(`${balance}`),
          supply: ethers.formatEther(supply.toString()),
          issuersCount: issuersCount.toString(),
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

      <div className="grid grid-cols-3 mt-12 gap-6">
        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaCoins className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.accountBalance}</p>
          <span className="font-semibold">Number of tokens owned</span>
        </div>

        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaBitcoin className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.supply}</p>
          <span className="font-semibold">Total Supply</span>
        </div>

        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaBitcoin className="text-5xl text-yellow-500" />
          <p className="mt-4">{stats.issuersCount}</p>
          <span className="font-semibold">Number Of Issuers</span>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold">Issuers</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Issuer Wallet Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Tokens Transfered
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  Wallet address
                </th>
              </tr>
            </thead>

            <tbody>
              {issuers.map((issuer) => (
                <tr
                  key={issuer.issuer}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {issuer.issuer}
                  </th>
                  <td className="px-6 py-4">{issuer.tokens} FC</td>
                  <td className="px-6 py-4">
                    {moment.unix(+issuer.timestamp).format("DD MMMM YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    {issuer.isAdded ? "true" : "false"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
