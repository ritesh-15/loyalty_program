import React from "react"
import { FaBitcoin, FaCoins, FaEthereum } from "react-icons/fa"

export default async function page() {
  return (
    <section className="mt-12 mx-4">
      <div className="">
        <h1 className="text-2xl font-bold">Loyalty Program</h1>
        <p className="">Manage the activity of the loyalty program</p>
      </div>

      <div className="grid grid-cols-3 mt-12 gap-6">
        <div className="flex w-full items-center bg-white flex-col p-4 rounded-md shadow-md">
          <FaCoins className="text-5xl text-yellow-500" />
          <p className="mt-4">10000000</p>
          <span className="font-semibold">Total Supply</span>
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
    </section>
  )
}
