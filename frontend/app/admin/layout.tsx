import React from "react"
import { AdminSidebar } from "../components/admin"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../utils/auth.utils"
import { BsCoin } from "react-icons/bs"
import { LiaSellsy } from "react-icons/lia"
import { LuStore } from "react-icons/lu"
import { PiUsersLight } from "react-icons/pi"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentUser()

  if (session?.data.role.name !== "Admin") redirect("/login")

  const routes = [
    {
      icon: <BsCoin />,
      title: "Loylty Program",
      redirectURL: "/admin",
      isHomePage: true,
      optionalURL: "/admin/transfer",
    },
    {
      icon: <LuStore />,
      title: "Brands",
      redirectURL: "/admin/brands",
      isHomePage: false,
      optionalURL: undefined,
    },
    {
      icon: <LiaSellsy />,
      title: "Sellers",
      redirectURL: "/admin/sellers",
      isHomePage: false,
      optionalURL: undefined,
    },
    {
      icon: <PiUsersLight />,
      title: "Referrals",
      redirectURL: "/admin/referrals",
      isHomePage: false,
      optionalURL: undefined,
    },
  ]

  return (
    <section className="flex overflow-y-hidden min-h-screen">
      <AdminSidebar routes={routes} />
      <div className="w-full">{children}</div>
    </section>
  )
}
