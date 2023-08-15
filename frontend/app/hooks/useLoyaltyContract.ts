"use client"

import { useWallet } from "../store/WalletStore"

export default function useLoyaltyContract() {
  const { getLoyaltyProgramContract, getTokenContract } = useWallet()
  const contract = getLoyaltyProgramContract()
  const tokenContract = getTokenContract()

  const getAccountBalance = async (address: string) => {
    const balance = await contract.accountBalance(address)
    return balance
  }

  const totalSupply = async () => {
    return await tokenContract.totalSupply()
  }

  return { getAccountBalance, totalSupply }
}
