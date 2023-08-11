"use client"

import React from "react"
import { LuStore } from "react-icons/lu"
import { LiaSellsy } from "react-icons/lia"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsCoin } from "react-icons/bs"

export default function AdminSidebar() {
  const usePath = usePathname()

  const isActive = (path: string, isHomePage: boolean = false) => {
    if (isHomePage) return usePath === path
    return usePath.includes(path)
  }

  const routes = [
    {
      icon: <BsCoin />,
      title: "Loylty Program",
      redirectURL: "/admin",
      isHomePage: true,
    },
    {
      icon: <LuStore />,
      title: "Brands",
      redirectURL: "/admin/brands",
      isHomePage: false,
    },
    {
      icon: <LiaSellsy />,
      title: "Sellers",
      redirectURL: "/admin/sellers",
      isHomePage: false,
    },
  ]

  return (
    <div className="z-50 h-full max-w-[300px] bg-white shadow-lg fixed top-0 bottom-0 left-0 md:relative border-r w-full p-4">
      <h1 className="font-bold  text-xl">Metamarket</h1>

      <ul className="mt-8 flex flex-col gap-2">
        {routes.map((route) => (
          <Link href={route.redirectURL}>
            <li
              className={`text-lg hover:bg-gray-100 rounded-md flex items-center px-2 py-3 cursor-pointer gap-2 ${
                isActive(route.redirectURL, route.isHomePage)
                  ? "bg-primary text-white hover:bg-primary"
                  : ""
              }`}
            >
              <div className="text-2xl">{route.icon}</div>
              <p>{route.title}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
