"use client"

import Button from "@/app/components/button/Button"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { useWallet } from "@/app/store/WalletStore"
import { formatWalletAddress } from "@/app/utils/formatWalletAddress"
import { ethers } from "ethers"
import moment from "moment"
import { toast } from "react-hot-toast"
import { useQuery } from "react-query"

export default function RewardHistory() {
  const { walletAddress } = useWallet()
  const { getHistoryForPurchase, getTokenEarnedOnPurchase } =
    useLoyaltyContract()

  const { data: transferHistory } = useQuery(
    ["reward-history"],
    () => getHistoryForPurchase(),
    {
      select: (data) => {
        const currentUserTransactions = data.filter(
          (item) => item.args[0].toLowerCase() === walletAddress.toLowerCase()
        )

        const result = currentUserTransactions.map(({ args, blockHash }) => {
          return {
            hash: blockHash,
            tokens: ethers.formatEther(args[2].toString()),
            timestamp: args[3].toString(),
          }
        })

        return result
      },
      onError: (err: any) => {
        toast.error("Someting went wrong whiel fetching the transctions")
      },
      enabled: walletAddress ? true : false,
    }
  )

  const { data: tokenEarnedOnPurchases } = useQuery(
    ["reward-history-orders"],
    () => getTokenEarnedOnPurchase(),
    {
      enabled: walletAddress ? true : false,
      onError: (err: any) => {
        toast.error("Someting went wrong whiel fetching the transctions")
      },
      select: (data) => {
        const currentUserTransactions = data.filter(
          (item) => item.args[2].toLowerCase() === walletAddress.toLowerCase()
        )

        const result = currentUserTransactions.map(({ args, blockHash }) => {
          return {
            hash: blockHash,
            tokens: ethers.formatEther(args[0].toString()),
            timestamp: args[3].toString(),
          }
        })

        return result
      },
    }
  )

  return (
    <section className="pt-28 w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Rewards History</h1>
          <p className="w-[75%]">
            You can view the tokens you earned and spent in the reward history
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold mb-4">
          Token transfered transactions
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Tokens
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transferHistory?.map((tx) => (
                <tr
                  key={tx.hash}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {formatWalletAddress(tx.hash)}
                  </td>
                  <td className="px-6 py-4">{tx.tokens} FC</td>
                  <td className="px-6 py-4">
                    {moment.unix(+tx.timestamp).format("DD MMMM YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      Transfered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold mb-4">Token earned transactions</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Tokens
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenEarnedOnPurchases?.map((tx) => (
                <tr
                  key={tx.hash}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {formatWalletAddress(tx.hash)}
                  </td>
                  <td className="px-6 py-4">{tx.tokens} FC</td>
                  <td className="px-6 py-4">
                    {moment.unix(+tx.timestamp).format("DD MMMM YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Earned
                    </span>
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
