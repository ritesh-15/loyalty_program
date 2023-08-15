import { toast } from "react-hot-toast"
import { create } from "zustand"
import { LOYALTY_PROGRAM_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "@/lib/constant"
import { ethers } from "ethers"
import { abi as LoyaltyProgramABI } from "@/lib/LoyaltyProgram.json"
import { abi as TokenABI } from "@/lib/Token.json"

interface IWallet {
  walletAddress: string
  isConnected: boolean
  connectWallet: () => void
  checkIfWalletConnected: () => void
  getLoyaltyProgramContract: () => any
  getLoyaltyProgramContractSigned: () => any
  getTokenContract: () => any
  getTokenContractSigned: () => any
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
      toast.error("Could not connect to wallet")
    }
  },
  getLoyaltyProgramContract: () => {
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/5rHFCUzjNhiqyDZSHVWGrBBzRgmieG-y"
    )

    const contract = new ethers.Contract(
      LOYALTY_PROGRAM_ADDRESS,
      LoyaltyProgramABI,
      provider
    )

    return contract
  },
  getTokenContract: () => {
    const provider = new ethers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/5rHFCUzjNhiqyDZSHVWGrBBzRgmieG-y"
    )

    const contract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      TokenABI,
      provider
    )

    return contract
  },
  getLoyaltyProgramContractSigned: async () => {
    const provider = new ethers.BrowserProvider(eth)
    const signer = await provider.getSigner()
    return new ethers.Contract(
      LOYALTY_PROGRAM_ADDRESS,
      LoyaltyProgramABI,
      signer
    )
  },
  getTokenContractSigned: async () => {
    const provider = new ethers.BrowserProvider(eth)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      TokenABI,
      signer
    )

    return contract
  },
}))
