"use client"

import Button from "@/app/components/button/Button"
import Input from "@/app/components/input/Input"
import BrandService from "@/app/services/brand.service"
import SellerService from "@/app/services/sellers.service"
import qs from "qs"
import React, { useState } from "react"
import { ISelectBrand } from "./ISelectBrand"
import { ISelectSeller } from "./ISelectSeller"
import { useSession } from "next-auth/react"
import { IUserSession } from "@/app/interfaces/IUser"
import { useQuery } from "react-query"

interface ISelectOptions {
  id: number
  name: string
  walletAddress: string
}

export default function TransferTokens() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const [options, setOptions] = useState<ISelectOptions[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")

  useQuery(
    ["select-brands"],
    () =>
      BrandService.getBrands<ISelectBrand>(
        user.token,
        qs.stringify(
          {
            fields: ["name", "id"],
            populate: {
              user: {
                fields: ["walletAddress"],
              },
            },
          },
          { encodeValuesOnly: true }
        )
      ),
    {
      onSuccess: ({ data }) => {
        setOptions([
          ...options,
          ...data.map((v) => ({
            id: v.id,
            name: v.attributes.name,
            walletAddress: v.attributes.user.data.attributes.walletAddress,
          })),
        ])
      },
      enabled: user ? true : false,
      staleTime: Infinity,
    }
  )

  useQuery(
    ["select-sellers"],
    () =>
      SellerService.getSellers<ISelectSeller>(
        user.token,
        qs.stringify(
          {
            fields: ["name", "id"],
            populate: {
              user: {
                fields: ["walletAddress"],
              },
            },
          },
          { encodeValuesOnly: true }
        )
      ),
    {
      onSuccess: ({ data }) => {
        setOptions([
          ...options,
          ...data.map((v) => ({
            id: v.id,
            name: v.attributes.name,
            walletAddress: v.attributes.user.data.attributes.walletAddress,
          })),
        ])
      },
      enabled: user ? true : false,
      staleTime: Infinity,
    }
  )

  return (
    <section className="mt-12 mx-4 bg-white p-4 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-1">Transfer tokens</h1>
      <p className="mb-8 w-[50%]">
        Tokens will be transfered to brand or sellers account, they will able to
        use this token to give to the loyal users
      </p>

      <form action="">
        <div className="mb-4">
          <label htmlFor="countries" className="block mb-2">
            Select Brand or Seller
          </label>
          <select
            onChange={(e) => setSelectedOption(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-2 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a user</option>
            {options.map((option) => (
              <option
                selected={selectedOption === option.walletAddress}
                key={option.id}
                value={option.walletAddress}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <Input title="Number of tokens" />
        </div>

        <Button className="w-fit ml-auto">Transfer</Button>
      </form>
    </section>
  )
}
