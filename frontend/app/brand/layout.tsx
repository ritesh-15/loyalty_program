import React from "react"
import { AdminSidebar } from "../components/admin"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../utils/auth.utils"
import { BsCoin, BsBox } from "react-icons/bs"

export default async function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentUser()

  if (session?.data.role.name !== "Brand") redirect("/")

  const routes = [
    {
      icon: <BsCoin />,
      title: "Loylty Program",
      redirectURL: "/brand",
      isHomePage: true,
      optionalURL: "/brand/transfer",
    },
    {
      icon: <BsBox />,
      title: "Products",
      redirectURL: "/brand/products",
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
