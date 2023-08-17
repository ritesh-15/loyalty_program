"use client"

import React, { useEffect, useState } from "react"
import { FaBitcoin, FaCoins } from "react-icons/fa"
import { IoMdPricetag } from "react-icons/io"
import {
  HiBuildingStorefront,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"
import { formatWalletAddress } from "../utils/formatWalletAddress"
import moment from "moment"
import { BsPercent } from "react-icons/bs"
import { CiCoins1, CiMoneyBill, CiTimer } from "react-icons/ci"
import { LiaBitcoin } from "react-icons/lia"
import { AiOutlineShop, AiOutlineTags } from "react-icons/ai"
import AdminCard from "../components/admin/AdminCard"

interface IIssuerTransaction {
  issuer: string
  tokens: string
  timestamp: string
  isAdded: boolean
}

interface ISettlement {
  transferFrom: string
  tokens: string
  timestamp: string
  hash: string
}

export default function page() {
  const { walletAddress } = useWallet()
  const {
    getAccountBalance,
    totalSupply,
    issuerTransactions,
    numberOfIssuers,
    getSettlementsTransactions,
    getInitialIssuerTokens,
    getDecayPeriod,
    updateSettlementRate,
    getSettlementRate,
  } = useLoyaltyContract()

  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
    issuersCount: "",
    initialIssuerTokens: "",
    decayRate: "",
    settelmentRate: "",
  })

  const [issuers, setIssuers] = useState<IIssuerTransaction[]>([])
  const [settlements, setSettlements] = useState<ISettlement[]>([])

  useEffect(() => {
    if (!walletAddress) return
    ;(async () => {
      try {
        const [
          balance,
          supply,
          issuersCount,
          settlementTransactions,
          initialIssuerTokens,
          decayPeriod,
          settlementRate,
        ] = await Promise.all([
          getAccountBalance(walletAddress),
          totalSupply(),
          numberOfIssuers(),
          getSettlementsTransactions(),
          getInitialIssuerTokens(),
          getDecayPeriod(),
          getSettlementRate(),
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

        setSettlements(
          settlementTransactions.map(({ args, blockHash }) => {
            return {
              transferFrom: args[0],
              tokens: ethers.formatEther(args[1].toString()),
              timestamp: args[2].toString(),
              hash: blockHash,
            }
          })
        )

        setStats({
          accountBalance: ethers.formatEther(`${balance}`),
          supply: ethers.formatEther(supply.toString()),
          issuersCount: issuersCount.toString(),
          initialIssuerTokens: ethers.formatEther(
            initialIssuerTokens.toString()
          ),
          decayRate: decayPeriod.toString(),
          settelmentRate: settlementRate.toString(),
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
        <AdminCard
          title="Number of tokens owned"
          value={stats.accountBalance}
          icon={<CiCoins1 />}
        />

        <AdminCard
          title="Total supply"
          value={stats.supply}
          icon={<LiaBitcoin />}
        />

        <AdminCard
          title="Number of issuers"
          value={stats.issuersCount}
          icon={<AiOutlineShop />}
        />

        <AdminCard
          title="Initial issuer tokens"
          value={stats.initialIssuerTokens}
          icon={<AiOutlineTags />}
        />

        <AdminCard
          title="Settlement rate"
          value={stats.settelmentRate}
          icon={<BsPercent />}
          isEditable
          modalTitle="Update settlement rate"
          modalDescription="Enter the new settlement rate to be used for transactions between brand and platform"
          updateFunction={updateSettlementRate}
        />

        <AdminCard
          title="Decay time"
          value={stats.decayRate}
          icon={<CiTimer />}
        />

        <AdminCard
          title="Minimum order amount"
          value="1000"
          icon={<CiMoneyBill />}
        />
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-bold">Settlements Transactions</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Hash
                </th>
                <th scope="col" className="px-6 py-3">
                  Transfer From
                </th>
                <th scope="col" className="px-6 py-3">
                  Tokens Transfered
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              {settlements.map((settlement) => (
                <tr
                  key={settlement.timestamp}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {formatWalletAddress(settlement.hash)}
                  </th>
                  <td className="px-6 py-4">
                    {formatWalletAddress(settlement.transferFrom)}
                  </td>
                  <td className="px-6 py-4">{settlement.tokens} FC</td>
                  <td className="px-6 py-4">
                    {moment.unix(+settlement.timestamp).format("DD MMMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
