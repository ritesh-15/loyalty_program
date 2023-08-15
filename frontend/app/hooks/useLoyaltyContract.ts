"use client"

import { LOYALTY_PROGRAM_ADDRESS } from "@/lib/constant"
import { useWallet } from "../store/WalletStore"
import { ethers } from "ethers"

export default function useLoyaltyContract() {
  const {
    getLoyaltyProgramContract,
    getTokenContract,
    getLoyaltyProgramContractSigned,
    getTokenContractSigned,
  } = useWallet()

  const getAccountBalance = async (address: string) => {
    const contract = await getLoyaltyProgramContract()
    return contract.accountBalance(address)
  }

  const totalSupply = async () => {
    const tokenContract = await getTokenContract()
    return tokenContract.totalSupply()
  }

  const settlementTransactions = async () => {
    const contract = await getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["SettlementRecord"]())
  }

  const addIssuer = async (address: string, accountddress: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    const tx = await contract.addIssuer(address, { from: accountddress })
    return tx
  }

  const approval = async () => {
    const contract = await getTokenContractSigned()
    const tx = await contract.approve(
      LOYALTY_PROGRAM_ADDRESS,
      ethers.parseEther("70000000000")
    )
    return tx
  }

  return {
    getAccountBalance,
    totalSupply,
    settlementTransactions,
    addIssuer,
    approval,
  }
}
