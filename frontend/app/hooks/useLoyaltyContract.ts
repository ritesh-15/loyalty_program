"use client"

import { useWallet } from "../store/WalletStore"

export default function useLoyaltyContract() {
  const { getLoyaltyProgramContract, getTokenContract } = useWallet()
  const contract = getLoyaltyProgramContract()
  const tokenContract = getTokenContract()

  const getAccountBalance = (address: string) => {
    return contract.accountBalance(address)
  }

  const totalSupply = () => {
    return tokenContract.totalSupply()
  }

  const settlementTransactions = () => {
    return contract.queryFilter(contract.filters["SettlementRecord"]())
  }

  return { getAccountBalance, totalSupply, settlementTransactions }
}
