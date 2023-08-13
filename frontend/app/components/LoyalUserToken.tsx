"use client"

import Button from "./button/Button"
import Input from "./input/Input"

interface IProps {
  onClose: () => void
  walletAddress: string
}

export default function LoyalUserToken({ onClose, walletAddress }: IProps) {
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
          <Input title="Number of token" />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button className="w-fit">Send</Button>
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
