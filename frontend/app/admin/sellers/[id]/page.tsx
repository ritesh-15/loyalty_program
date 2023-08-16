"use client"

import Button from "@/app/components/button/Button"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { ISellerDetails } from "@/app/interfaces/ISellerDetails"
import { IUserSession } from "@/app/interfaces/IUser"
import SellerService from "@/app/services/sellers.service"
import { useWallet } from "@/app/store/WalletStore"
import { ethers } from "ethers"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import qs from "qs"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CiUser } from "react-icons/ci"
import { FaCoins, FaBitcoin } from "react-icons/fa"
import { useQuery } from "react-query"

interface IProps {
  params: {
    id: string
  }
}

export default function SellerDetails({ params }: IProps) {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const { walletAddress } = useWallet()
  const { getAccountBalance, totalSupply } = useLoyaltyContract()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    accountBalance: "",
    supply: "",
  })

  const query = qs.stringify(
    {
      fields: ["name", "location"],
      populate: {
        user: {
          fields: ["username", "walletAddress"],
        },
        brands: {
          fields: ["name", "brandLogo"],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: seller } = useQuery(
    ["seller", params.id],
    () =>
      SellerService.getSellerByID<ISellerDetails>(
        params.id,
        user?.token,
        query
      ),
    {
      enabled: user ? true : false,
    }
  )

  useEffect(() => {
    if (!walletAddress || !seller) return
    ;(async () => {
      try {
        const [balance, supply] = await Promise.all([
          getAccountBalance(
            seller.data.attributes.user.data.attributes.walletAddress
          ),
          totalSupply(),
        ])

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
  }, [walletAddress, seller])

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-[75px] h-[75px] rounded-full border-2 border-transparent border-r-primary border-b-primary border-l-primary animate-spin"></div>
      </div>
    )

  return (
    <section className="mt-12 mx-4 bg-white rounded-md shadow-md p-4">
      <div className="">
        <h1 className="text-2xl font-bold mt-4">
          {seller?.data.attributes.name}
        </h1>

        <p className="mt-2">{seller?.data.attributes.location}</p>

        <div className="flex items-center p-2 rounded-md border  gap-2 w-fit mt-4">
          <CiUser className="text-2xl" />
          <span>{seller?.data.attributes.user.data.attributes.username}</span>
        </div>
      </div>

      <div className="border-t mt-6 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Loyalty Program</h1>

          <Link href="/admin/transfer">
            <Button className="w-fit">Transfer tokens</Button>
          </Link>
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
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of tokens
                </th>
                <th scope="col" className="px-6 py-3">
                  Received / Deducted
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  7864454fdf
                </th>
                <td className="px-6 py-4">4100</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Recevied
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h1 className="text-xl font-bold mb-8">Brands</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Brand Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Logo
                </th>
              </tr>
            </thead>
            <tbody>
              {seller?.data.attributes.brands?.data.map((brand) => (
                <tr
                  key={brand.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {brand.attributes.name}
                  </th>
                  <td className="px-6 py-4">
                    <Image
                      height={25}
                      width={25}
                      src={brand.attributes.brandLogo}
                      alt=""
                    />
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
