"use client"
import Button from "@/app/components/button/Button"
import React, { useState } from "react"
import useRegister from "./useRegister"
import Input from "@/app/components/input/Input"
import Link from "next/link"
import ConnectToMetamaskModal from "@/app/components/ConnectToMetamaskModal"
import Modal from "@/app/components/Modal"
import { useWallet } from "@/app/store/WalletStore"
import { formatWalletAddress } from "@/app/utils/formatWalletAddress"
import { useMutation, useQuery } from "react-query"
import qs from "qs"
import ReferralService from "@/app/services/referral.service"
import { ISingleReferral } from "@/app/services/ISingleReferral"

export default function Register() {
  const { actions, states } = useRegister()
  const { isConnected, walletAddress } = useWallet()

  return (
    <>
      <section className="min-h-screen w-full flex items-center justify-center ">
        <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md w-[95%] max-w-[550px]">
          <h1 className="text-xl font-bold">Hey new to Meta market! 👋</h1>
          <p className="mt-2 max-w-[80%] text-center">
            Create an account and start using now.
          </p>

          <form
            onSubmit={actions.handleSubmit}
            action=""
            className="mt-4 w-full"
          >
            <div className="mb-4">
              <Input
                placeholder="john doe"
                title="Name"
                type="text"
                name="name"
                onChange={actions.handleChange}
                value={states.values.name}
                error={states.errors.name}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="johndoe@gmail.com"
                title="Email address"
                type="email"
                name="email"
                onChange={actions.handleChange}
                value={states.values.email}
                error={states.errors.email}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="*********"
                title="Password"
                type="password"
                name="password"
                onChange={actions.handleChange}
                value={states.values.password}
                error={states.errors.password}
              />
            </div>

            {states.hasId && (
              <div className="mb-4">
                <Input
                  placeholder="referral_code"
                  title="Referral code"
                  type="text"
                  name="Referral"
                  onChange={(e) => {
                    actions.setUserReferralId(e.target.value)
                  }}
                  value={states.userReferralId}
                  error={states.referralError}
                />
              </div>
            )}

            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input
                onChange={() => actions.setHasId(!states.hasId)}
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Have an refferal code
              </span>
            </label>

            {walletAddress && (
              <div className="mb-4 flex flex-col gap-1 p-2 rounded-md border w-fit">
                <span>Connected wallet address</span>
                <p>{formatWalletAddress(walletAddress)}</p>
              </div>
            )}

            <Button loading={states.isLoading} type="submit">
              Register
            </Button>
          </form>

          <div className="mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <Modal open={!isConnected}>
        <ConnectToMetamaskModal />
      </Modal>
    </>
  )
}
