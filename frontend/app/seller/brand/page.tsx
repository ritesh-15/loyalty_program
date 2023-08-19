"use client"

import Button from "@/app/components/button/Button"
import { IBrands } from "@/app/interfaces/IBrands"
import { ISellers } from "@/app/interfaces/ISellers"
import { IUserSession } from "@/app/interfaces/IUser"
import BrandService from "@/app/services/brand.service"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import qs from "qs"
import { useQuery } from "react-query"

export default function Brand() {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const query = qs.stringify(
    {
      fields: ["name", "brandLogo"],
      populate: {
        user: {
          fields: ["username"],
        },
      },
      filters: {
        brandId: {
          id: {
            $in: user?.data.brandId?.id,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const { data: brand } = useQuery(
    ["brands", user?.data.brandId?.id],
    () => BrandService.getBrands<IBrands>(user.token, query),
    {
      enabled: user !== undefined ? true : false,
    }
  )

  return (
    <section className="mt-12 mx-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Seller</h1>
          <p className="">Manage the brands</p>
        </div>
        <Link href="#">
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
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {brand?.data.map((brand) => (
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
                  <td className="px-6 py-4">{<Image src ={brand.attributes.brandLogo} alt ='' height={50} width={50} />}</td>
                  <td className="px-6 py-4">
                    {brand.attributes.user.data.attributes.username}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <Link
                      href={`/admin/sellers/${brand.id}`}
                      className="font-medium text-primary dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </Link>
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
