"use client"

import React from "react"
import { LuStore } from "react-icons/lu"
import { LiaSellsy } from "react-icons/lia"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsCoin } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { IUserSession } from "@/app/interfaces/IUser"

interface IProps {
  routes: {
    icon: React.JSX.Element
    title: string
    redirectURL: string
    isHomePage: boolean
    optionalURL?: string
  }[]
}

export default function AdminSidebar({ routes }: IProps) {
  const { data: session } = useSession()
  const user = session?.user as IUserSession

  const usePath = usePathname()

  const isActive = (
    path: string,
    isHomePage: boolean = false,
    optionalURL?: string
  ) => {
    if (isHomePage)
      return usePath === path || (optionalURL && usePath.includes(optionalURL))
    return (
      usePath.includes(path) || (optionalURL && usePath.includes(optionalURL))
    )
  }

  return (
    <div className="h-full max-w-[300px] bg-white shadow-lg fixed top-0 bottom-0 left-0 md:relative border-r w-full p-4">
      <h1 className="font-bold  text-xl">Metamarket</h1>

      <ul className="mt-8 flex flex-col gap-3">
        {routes.map((route, key) => (
          <Link href={route.redirectURL} key={key}>
            <li
              className={` hover:bg-gray-100 rounded-md flex items-center px-2 py-3 cursor-pointer gap-3 ${
                isActive(route.redirectURL, route.isHomePage, route.optionalURL)
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
