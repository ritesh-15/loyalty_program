"use client"
import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { RxTokens } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { IUserSession } from "../interfaces/IUser";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const walletHistory = [
  { date: "August 10, 2023", product: "Iphone 14 Pro", value: "+500 Tokens" },
  { date: "August 09, 2023", product: "Black jeans", value: "-250 Tokens" },
  { date: "August 09, 2023", product: "Xiomi T.V.", value: "+800 Tokens" },
  { date: "August 07, 2023", product: "H&M T-shirt", value: "+450 Tokens" },
  { date: "August 05, 2023", product: "Table Fan", value: "-1000 Tokens" },
  { date: "August 04, 2023", product: "Trousers", value: "+500 Tokens" },
  { date: "August 02, 2023", product: "Realme 7", value: "+500 Tokens" },
  { date: "August 01, 2023", product: "Iphone 14 Pro", value: "-100 Tokens" },
];

const Rewards = () => {

  const {data} = useSession()
  const user = data?.user as IUserSession
  console.log(user)

  return (
    <section>
      <Navbar />
      <div className="p-28">
        <div className="text-center grid grid-cols-2 gap-96">
          <div className="flex flex-row text-4xl">
            <RxTokens />
            <p className="translate-x-4 font-serif ">Rewards</p>
          </div>
          {/* <div className="px-5 py-2.5 mr-2 mb-2">Wallet Balance</div> */}
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View wallet history
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mt-16 mb-8 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Wallet Balance</h2>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2" id="wallet-balance">
              1000$
            </span>
            <div className="animate-flip">+50 Tokens</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Wallet History</h2>
          <ul>
            {walletHistory.map((entry, index) => {
              return (
                <div key={index}>
                  <li className="flex items-center justify-between mb-2">
                    <div className="text-gray-500">{entry.date}</div>
                    <div className="text-slate-800">{entry.product}</div>
                    <div className={entry.value.charAt(0)==='+'?"text-green-500":"text-red-500"}>{entry.value}</div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              We invest in the world’s potential
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Get started
              </a>
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Rewards;
