"use client"

import brand from "@/app/brand/page"
import Button from "@/app/components/button/Button"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { ISellers } from "@/app/interfaces/ISellers"
import { IUserSession } from "@/app/interfaces/IUser"
import SellerService from "@/app/services/sellers.service"
import { useWallet } from "@/app/store/WalletStore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import qs from "qs"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useQuery } from "react-query"

export default function Sellers() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const { walletAddress } = useWallet()
  const { addIssuer } = useLoyaltyContract()
  const [loading, setLoading] = useState(false)

  const query = qs.stringify(
    {
      fields: ["name", "location"],
      populate: {
        user: {
          fields: ["username", "walletAddress"],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: sellers } = useQuery(
    ["sellers"],
    () => SellerService.getSellers<ISellers>(user.token, query),
    {
      enabled: user ? true : false,
    }
  )

  const handleAddIssuer = async (address: string) => {
    setLoading(true)
    try {
      await addIssuer(address, walletAddress)
      toast.success("Issuer added successfully!")
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12 mx-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Sellers</h1>
          <p className="">Manage sellers on platform</p>
        </div>
        <Link href="/admin/brands/create">
          <Button className="w-fit">Add new seller</Button>
        </Link>
      </div>

      <div className="mt-12">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Seller Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {sellers?.data.map((seller) => (
                <tr
                  key={seller.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {seller.attributes.name}
                  </th>
                  <td className="px-6 py-4">{seller.attributes.location}</td>
                  <td className="px-6 py-4">
                    {seller.attributes.user.data.attributes.username}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <Link
                      href={`/admin/sellers/${seller.id}`}
                      className="font-medium text-primary dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Button
                      loading={loading}
                      onClick={() =>
                        handleAddIssuer(
                          seller.attributes.user.data.attributes.walletAddress
                        )
                      }
                      className="w-fit"
                    >
                      Add Issuer
                    </Button>
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
