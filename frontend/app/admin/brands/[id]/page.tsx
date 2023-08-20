"use client"

import Button from "@/app/components/button/Button"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { IBrandDetails } from "@/app/interfaces/IBrandDetails"
import { IUserSession } from "@/app/interfaces/IUser"
import BrandService from "@/app/services/brand.service"
import { useWallet } from "@/app/store/WalletStore"
import { formatWalletAddress } from "@/app/utils/formatWalletAddress"
import { ethers } from "ethers"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import qs from "qs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CiUser } from "react-icons/ci"
import { FaCoins, FaEthereum, FaBitcoin } from "react-icons/fa"
import { useQuery } from "react-query"

interface IProps {
  params: {
    id: string
  }
}

interface IIssuerTransaction {
  user: string
  brandAddress: string
  tokens: string
  timestamp: string
  hash: string
}

export default function BrandDetails({ params }: IProps) {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const { walletAddress } = useWallet()
  const { getAccountBalance, totalSupply, getTokenTransferedTransactions } =
    useLoyaltyContract()

  const [transactions, setTransactions] = useState<IIssuerTransaction[]>([])
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
  })

  const query = qs.stringify(
    {
      fields: ["name", "brandLogo"],
      populate: {
        user: {
          fields: ["username", "walletAddress"],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: brand } = useQuery(
    ["brand", params.id],
    () =>
      BrandService.getBrandByID<IBrandDetails>(params.id, user?.token!!, query),
    {
      enabled: user ? true : false,
    }
  )

  useEffect(() => {
    if (!walletAddress || !brand) return
    ;(async () => {
      try {
        const [balance, supply, transactions] = await Promise.all([
          getAccountBalance(
            brand.data.attributes.user.data.attributes.walletAddress
          ),
          totalSupply(),
          getTokenTransferedTransactions(),
        ])

        setStats({
          accountBalance: ethers.formatEther(`${balance}`),
          supply: ethers.formatEther(supply.toString()),
        })

        const brandTransactions = transactions.filter(
          (tx) =>
            tx.args[1].toLowerCase() ===
            brand.data.attributes.user.data.attributes.walletAddress.toLowerCase()
        )

        setTransactions(
          brandTransactions.map(({ args, blockHash }) => {
            return {
              user: args[0],
              brandAddress: args[1],
              tokens: ethers.formatEther(args[2].toString()),
              timestamp: args[3].toString(),
              hash: blockHash,
            }
          })
        )
      } catch (error: any) {
        toast.error("Something went wrong")
      } finally {
        setLoading(false)
      }
    })()
  }, [walletAddress, brand])

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <section className="mt-12 mx-4 bg-white rounded-md shadow-md p-4">
      <div className="">
        <Image
          src={brand?.data.attributes.brandLogo || ""}
          alt=""
          width={150}
          height={150}
        />

        <h1 className="text-2xl font-bold mt-4">
          {brand?.data.attributes.name}
        </h1>

        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eum
          quibusdam minus quasi, sunt blanditiis quae neque iusto dolorem
          expedita, explicabo alias voluptate dolor perspiciatis repellat
          laudantium culpa animi commodi.
        </p>

        <div className="flex items-center p-2 rounded-md border  gap-2 w-fit mt-4">
          <CiUser className="text-2xl" />
          <span>{brand?.data.attributes.user.data.attributes.username}</span>
        </div>
      </div>

      <div className="border-t mt-6 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Loyalty Program</h1>
        </div>

        <div className="grid grid-cols-2 mt-8 gap-6">
          <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
            <FaCoins className="text-5xl text-yellow-500" />
            <p className="mt-4">{stats.accountBalance}</p>
            <span className="font-semibold">Number of tokens</span>
          </div>

          <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
            <FaBitcoin className="text-5xl text-yellow-500" />
            <p className="mt-4">{stats.supply}</p>
            <span className="font-semibold">Total Supply</span>
          </div>
        </div>
      </div>

      <div className="border-t mt-6 pt-6">
        <h1 className="text-xl font-bold mb-8">Latest Transactions</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Hash
                </th>
                <th scope="col" className="px-6 py-3">
                  User Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of tokens
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                ({ brandAddress, hash, timestamp, tokens, user }) => (
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
                    <td className="px-6 py-4">{tokens}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Recevied
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
