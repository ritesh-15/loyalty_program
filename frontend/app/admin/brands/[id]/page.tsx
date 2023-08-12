import Button from "@/app/components/button/Button"
import { IBrandDetails } from "@/app/interfaces/IBrandDetails"
import BrandService from "@/app/services/brand.service"
import { getCurrentUser } from "@/app/utils/auth.utils"
import Image from "next/image"
import Link from "next/link"
import qs from "qs"
import { CiUser } from "react-icons/ci"
import { FaCoins, FaEthereum, FaBitcoin } from "react-icons/fa"

interface IProps {
  params: {
    id: string
  }
}

export default async function BrandDetails({ params }: IProps) {
  const session = await getCurrentUser()

  const query = qs.stringify(
    {
      fields: ["name", "brandLogo"],
      populate: {
        user: {
          fields: ["username"],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const brand = await BrandService.getBrandByID<IBrandDetails>(
    params.id,
    session?.token!!,
    query
  )

  return (
    <section className="mt-12 mx-4 bg-white rounded-md shadow-md p-4">
      <div className="">
        <Image
          src={brand.data.attributes.brandLogo}
          alt=""
          width={150}
          height={150}
        />

        <h1 className="text-2xl font-bold mt-4">
          {brand.data.attributes.name}
        </h1>

        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eum
          quibusdam minus quasi, sunt blanditiis quae neque iusto dolorem
          expedita, explicabo alias voluptate dolor perspiciatis repellat
          laudantium culpa animi commodi.
        </p>

        <div className="flex items-center p-2 rounded-md border  gap-2 w-fit mt-4">
          <CiUser className="text-2xl" />
          <span>{brand.data.attributes.user.data.attributes.username}</span>
        </div>
      </div>

      <div className="border-t mt-6 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Loyalty Program</h1>

          <Link href="/admin/transfer">
            <Button className="w-fit">Transfer tokens</Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 mt-8 gap-6">
          <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
            <FaCoins className="text-5xl text-yellow-500" />
            <p className="mt-4">200</p>
            <span className="font-semibold">Number of tokens</span>
          </div>

          <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
            <FaEthereum className="text-5xl text-yellow-500" />
            <p className="mt-4">0.5 ETH</p>
            <span className="font-semibold">Token Value</span>
          </div>

          <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
            <FaBitcoin className="text-5xl text-yellow-500" />
            <p className="mt-4">10000000</p>
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
    </section>
  )
}
