import { toast } from "react-hot-toast"
import { create } from "zustand"
import { LOYALTY_PROGRAM_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "@/lib/constant"
import { ethers } from "ethers"
import { abi as LoyaltyProgramABI } from "@/lib/LoyaltyProgram.json"
import { abi as TokenABI } from "@/lib/Token.json"

import { LoyaltyProgram__factory } from "@/typechain-types/factories/contracts/LoyaltyProgram__factory"
import { Token__factory } from "@/typechain-types/factories/contracts/Token__factory"
import { LoyaltyProgram } from "@/typechain-types/contracts/LoyaltyProgram"
import { Token } from "@/typechain-types/contracts/Token"

interface IWallet {
  walletAddress: string
  isConnected: boolean
  connectWallet: () => void
  checkIfWalletConnected: () => void
  getLoyaltyProgramContract: () => LoyaltyProgram
  getLoyaltyProgramContractSigned: () => Promise<LoyaltyProgram>
  getTokenContract: () => Token
  getTokenContractSigned: () => Promise<Token>
}

let eth: any = null

if (typeof window !== "undefined") {
  eth = (<any>window).ethereum
}

export const useWallet = create<IWallet>((set, get) => ({
  walletAddress: "",
  isConnected: false,
  connectWallet: async () => {
    if (!eth) {
      set({
        isConnected: false,
      })
      return
    }

    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" })

      set({
        walletAddress: accounts[0],
        isConnected: true,
      })
    } catch (error) {
      set({
        isConnected: false,
      })
      toast.error("Could not connect to wallet")
    }
  },
  checkIfWalletConnected: async () => {
    if (!eth) {
      set({
        isConnected: false,
      })
      return
    }

    try {
      const accounts = await eth.request({ method: "eth_accounts" })
      if (accounts.length === 0) throw new Error("Meta mask accounts not found")
      set({
        walletAddress: accounts[0],
        isConnected: true,
      })
    } catch (error) {
      set({
        isConnected: false,
      })
    }
  },
  getLoyaltyProgramContract: () => {
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/5rHFCUzjNhiqyDZSHVWGrBBzRgmieG-y"
    )

    const contract = LoyaltyProgram__factory.connect(
      LOYALTY_PROGRAM_ADDRESS,
      provider
    )

    return contract
  },
  getTokenContract: () => {
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/5rHFCUzjNhiqyDZSHVWGrBBzRgmieG-y"
    )

    const contract = Token__factory.connect(TOKEN_CONTRACT_ADDRESS, provider)

    return contract
  },
  getLoyaltyProgramContractSigned: async () => {
    const provider = new ethers.BrowserProvider(eth)
    const signer = await provider.getSigner()
    // return new ethers.Contract(
    //   LOYALTY_PROGRAM_ADDRESS,
    //   LoyaltyProgramABI,
    //   signer
    // ) as unknown as any
    return LoyaltyProgram__factory.connect(LOYALTY_PROGRAM_ADDRESS, signer)
  },
  getTokenContractSigned: async () => {
    const provider = new ethers.BrowserProvider(eth)
    const signer = await provider.getSigner()

    // return new ethers.Contract(
    //   TOKEN_CONTRACT_ADDRESS,
    //   TokenABI,
    //   signer
    // ) as unknown as any

    return Token__factory.connect(TOKEN_CONTRACT_ADDRESS, signer)
  },
}))
