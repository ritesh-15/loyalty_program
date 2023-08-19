"use client"

import React, { useEffect, useState } from "react"
import { FaCoins, FaBitcoin } from "react-icons/fa"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"
import toast from "react-hot-toast"
import AdminCard from "../components/admin/AdminCard"
import moment from "moment"
import { formatWalletAddress } from "../utils/formatWalletAddress"

interface ILoyaltyTokenHistory {
  issuer: string
  user: string
  tokens: string
  timestamp: string
  hash: string
}

export default function brand() {
  const { getAccountBalance, totalSupply, getLoyalUserTokenHistory } =
    useLoyaltyContract()
  const [loading, setLoding] = useState(true)
  const { walletAddress } = useWallet()

  const [loyalTokensHistory, setLoyalTokensHistory] = useState<
    ILoyaltyTokenHistory[]
  >([])

  const [stats, setStats] = useState({
    balance: "",
    supply: "",
  })

  useEffect(() => {
    if (!walletAddress) return
    ;(async () => {
      try {
        const [balance, supply, loyalUserTokensHistory] = await Promise.all([
          getAccountBalance(walletAddress),
          totalSupply(),
          getLoyalUserTokenHistory(),
        ])

        setStats({
          balance: ethers.formatEther(balance),
          supply: ethers.formatEther(supply),
        })

        const transactions = loyalUserTokensHistory.filter(
          (item) => item.args[0].toLowerCase() === walletAddress
        )

        setLoyalTokensHistory(
          transactions.map(({ args, blockHash }) => {
            return {
              issuer: args[0],
              user: args[1],
              tokens: ethers.formatEther(args[2].toString()),
              timestamp: args[3].toString(),
              hash: blockHash,
            }
          })
        )
      } catch (err: any) {
        toast.error("Someting went wrong please try again!")
      } finally {
        setLoding(false)
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
    <section className="mx-4">
      <div className="">
        <h1 className="text-2xl font-bold">Loyalty Program</h1>
        <p className="">Manage the activity of the loyalty program</p>
      </div>

      <div className="grid grid-cols-3 mt-12 gap-6">
        <AdminCard
          icon={<FaCoins />}
          title="Number of tokens"
          value={stats.balance}
        />

        <AdminCard
          icon={<FaBitcoin />}
          title="Total Supply"
          value={stats.supply}
        />
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold">
          Tokens Trasfered To Loyal User Transactions
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Hash
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Tokens
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {loyalTokensHistory.length === 0 ? (
                <td className="px-6 py-4s">No previous transactions found</td>
              ) : (
                loyalTokensHistory.map(
                  ({ timestamp, hash, issuer, tokens, user }) => (
                    <tr
                      key={hash}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {formatWalletAddress(hash)}
                      </th>
                      <td className="px-6 py-4">{formatWalletAddress(user)}</td>
                      <td className="px-6 py-4">{tokens} FC</td>
                      <td className="px-6 py-4">
                        {moment.unix(+timestamp).format("DD MMMM YYYY")}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
