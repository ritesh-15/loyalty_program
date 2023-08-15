"use client"
import Button from "@/app/components/button/Button"
import { IUserSession } from "@/app/interfaces/IUser"
import BrandService from "@/app/services/brand.service"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useState } from "react"
import { useQuery } from "react-query"
import qs from "qs"
import { IBrands } from "@/app/interfaces/IBrands"
import Image from "next/image"
import { formatWalletAddress } from "@/app/utils/formatWalletAddress"
import { useWallet } from "@/app/store/WalletStore"
import useLoyaltyContract from "@/app/hooks/useLoyaltyContract"
import { toast } from "react-hot-toast"
import { LOYALTY_PROGRAM_ADDRESS } from "@/lib/constant"
import { ethers } from "ethers"

export default function Brands() {
  const { walletAddress, getTokenContractSigned } = useWallet()
  const { addIssuer } = useLoyaltyContract()
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const user = session?.user as IUserSession

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

  const { data: brands } = useQuery(
    ["brands"],
    () => BrandService.getBrands<IBrands>(user.token, query),
    {
      enabled: user ? true : false,
    }
  )

  const handleAddIssuer = async (address: string) => {
    setLoading(true)
    const token = await getTokenContractSigned()
    try {
      // const tx = await token.approve(
      //   LOYALTY_PROGRAM_ADDRESS,
      //   ethers.parseEther("70000000000")
      // )

      // await tx.wait()

      await addIssuer(address, walletAddress)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12 mx-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Brands</h1>
          <p className="">Create and manage brands</p>
        </div>
        <Link href="/admin/brands/create">
          <Button className="w-fit">Add new brand</Button>
        </Link>
      </div>

      <div className="mt-12">
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
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Wallet address
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {brands?.data.map((brand) => (
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
                  <td className="px-6 py-4">
                    {brand.attributes.user.data.attributes.username}
                  </td>
                  <td className="px-6 py-4">
                    {formatWalletAddress(
                      brand.attributes.user.data.attributes.walletAddress
                    )}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <Link
                      href={`/admin/brands/${brand.id}`}
                      className="font-medium text-primary dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Button
                      loading={loading}
                      onClick={() =>
                        handleAddIssuer(
                          brand.attributes.user.data.attributes.walletAddress
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
