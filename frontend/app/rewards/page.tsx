"use client";
import React from "react";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { RxTokens } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { IUserSession } from "../interfaces/IUser";
import qs from "qs";
import { useQuery } from "react-query";
import RewardService from "../services/reward.service";
import { IRewards } from "../interfaces/IRewards";
import Image from "next/image";

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
  const { data } = useSession();
  const user = data?.user as IUserSession;

  const query = qs.stringify(
    {
      fields: ["discount", "points"],
      populate: {
        product: {
          fields: ["name", "description", "images", "price"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const { data: rewards } = useQuery(
    ["rewards"],
    () => RewardService.getRewards<IRewards>(user.token, query),
    {
      enabled: user ? true : false,
    }
  );

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

        {/* <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Wallet History</h2>
          <ul>
            {walletHistory.map((entry, index) => {
              return (
                <div key={index}>
                  <li className="flex items-center justify-between mb-2">
                    <div className="text-gray-500">{entry.date}</div>
                    <div className="text-slate-800">{entry.product}</div>
                    <div
                      className={
                        entry.value.charAt(0) === "+"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {entry.value}
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div> */}

        <div className="m-8">
          <h1 className="text-3xl text-left left-10">
            Exciting Rewards Only for you!
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4 m-8">
          {rewards?.data.map((reward, index) => {
            return (
              <div key={index}>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  {reward.attributes.product.data.attributes.images && (
                    <div className="flex justify-center items-center h-48">
                      <a href="#">
                        <Image
                          className="rounded-t-lg"
                          src={
                            reward.attributes.product.data.attributes.images[0]
                          }
                          alt=""
                          height={100}
                          width={100}
                        />
                      </a>
                    </div>
                  )}
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {reward.attributes.discount}% worth{" "}
                      {reward.attributes.points}$ Tokens
                    </h5>
                    <h3 className="text-xl font-sans">
                      {reward.attributes.product.data.attributes.name}
                    </h3>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {reward.attributes.product.data.attributes.description}
                    <br />
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {Math.floor(
                      reward.attributes.product.data.attributes.price -
                        (reward.attributes.discount *
                          reward.attributes.product.data.attributes.price) /
                          100
                    )}{" "}
                    rs. Only
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Rewards;
