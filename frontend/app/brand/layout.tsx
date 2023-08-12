import React from "react"
import { AdminSidebar } from "../components/admin"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../utils/auth.utils"

export default async function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentUser()

  if (session?.data.role.name !== "Brand") redirect("/")

  return (
    <section className="flex h-screen overflow-y-hidden bg-gray-50">
      <AdminSidebar />
      <div className="w-full min-h-screen overflow-y-auto mb-8">{children}</div>
    </section>
  )
}
