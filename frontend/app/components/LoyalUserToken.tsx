"use client"

import { toast } from "react-hot-toast"
import useLoyaltyContract from "../hooks/useLoyaltyContract"
import Button from "./button/Button"
import Input from "./input/Input"
import { FormEvent, useState } from "react"

interface IProps {
  onClose: () => void
  walletAddress: string
}

export default function LoyalUserToken({ onClose, walletAddress }: IProps) {
  const {issueTokenToLoaylUser, approveTokens} = useLoyaltyContract()
  const [amount,setAmount] = useState("")

  const send = async (e:FormEvent) => {
    e.preventDefault()
    try {
     const tx =  await approveTokens(+amount)
     await tx.wait()
      await issueTokenToLoaylUser(amount,walletAddress)
      toast.success("Issued token to user succesfully!")
      onClose()
    }catch(e:any) {
      toast.error("Enable to transfer token to user please try again!")
    }
  }

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-1">Send tokens to loyal users</h1>
      <p className="mb-8">
        You can send the tokens to the loyal users that frequently purchase from
        you brands
      </p>

      <form action="">
        <div className="mb-4">
          <Input value={walletAddress} readOnly title="User wallet address" />
        </div>
        <div className="mb-4">
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} title="Number of token" />
          <p className="mt-2">Maximum 10 FC coins can be send</p>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button onClick={send} className="w-fit">Send</Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-white text-primary w-fit"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
