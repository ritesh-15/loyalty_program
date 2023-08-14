import React from "react"
import { AdminSidebar } from "../components/admin"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../utils/auth.utils"
import { BsCoin, BsBox, BsTruck } from "react-icons/bs"
import { LiaSellsy } from "react-icons/lia"

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentUser()

  if (session?.data.role.name !== "Seller") redirect("/")

  const routes = [
    {
      icon: <BsCoin />,
      title: "Loylty Program",
      redirectURL: "/seller",
      isHomePage: true,
      optionalURL: "/seller/transfer",
    },
    {
      icon: <BsBox />,
      title: "Products",
      redirectURL: "/seller/products",
      isHomePage: false,
      optionalURL: undefined,
    },
    {
      icon: <LiaSellsy />,
      title: "Brand",
      redirectURL: "/seller/brand",
      isHomePage: false,
      optionalURL: undefined,
    },
    {
      icon: <BsTruck />,
      title: "Orders",
      redirectURL: "/seller/orders",
      isHomePage: false,
      optionalURL: undefined,
    },
  ]

  return (
    <section className="flex h-screen overflow-y-hidden bg-gray-50">
      <AdminSidebar routes={routes} />
      <div className="w-full min-h-screen overflow-y-auto mb-8">{children}</div>
    </section>
  )
}
