"use client"
import React, { useState } from "react"
import { FiShoppingCart } from "react-icons/fi"
import { FaUserAlt } from "react-icons/fa"
import { signOut, useSession } from "next-auth/react"
import { IUserSession } from "../interfaces/IUser"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { GoSearch } from "react-icons/go"
import { CiShoppingCart, CiUser } from "react-icons/ci"
import Button from "./button/Button"
import { useCartStore } from "../store/CartStore"

const Navbar = () => {
  const { data } = useSession()
  const user = data?.user as IUserSession

  const router = useRouter()

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { cartItems } = useCartStore()

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  const logout = async () => {
    try {
      await signOut()
      toast.success("Logged out successfully!")
      router.push("/")
    } catch (e) {
      toast.error("Something went wrong while logging you out!")
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 shadow-md bg-white">
      <div className="flex items-center justify-between m-4 max-w-[1300px] mx-auto w-[95%]">
        <div>
          <Link href={"/"}>
            <h1 className={`text-xl font-bold`}>🪙 MetaMarket</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-100 px-2 p-4 rounded-full flex items-center gap-2">
            <GoSearch className="text-xl" />
            <input
              type="text"
              className="bg-transparent outline-none text-sm"
              placeholder="Search products"
            />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center justify-center border p-3 rounded-full hover:bg-gray-50"
                  onClick={toggleProfileDropdown}
                >
                  <CiUser className="text-xl" />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        Profile
                      </li>
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <Link href={"/orders"}>Orders</Link>
                      </li>

                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <Link href={"/rewards"}>Rewards</Link>
                      </li>

                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <Link href={"/referral"}>Refer and earn 🪙</Link>
                      </li>

                      <li
                        onClick={logout}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <Link href="/login">
                  <Button>Login / Register</Button>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Link className="relative w-fit h-fit" href={"/cart"}>
              <CiShoppingCart className="text-3xl" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-4 -right-10 dark:border-gray-900">
                {cartItems.length}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
