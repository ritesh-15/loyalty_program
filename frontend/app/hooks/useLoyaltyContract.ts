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
    walletAddress,
  } = useWallet()

  const getAccountBalance = async (address: string) => {
    const contract = await getLoyaltyProgramContract()
    return contract.accountBalance(address)
  }

  const totalSupply = async () => {
    const tokenContract = await getTokenContract()
    return tokenContract.totalSupply()
  }

  const settlementTransactions = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["SettlementRecord"]())
  }

  const issuerTransactions = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["IssuerRecord"]())
  }

  const numberOfIssuers = () => {
    const contract = getLoyaltyProgramContract()
    return contract.numberOfIssuers()
  }

  const addIssuer = async (address: string, accountddress: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.addIssuer(address, { from: accountddress })
  }

  const getTokenOnOrder = async (address: string, numberOfTokens: number) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.getTokensOnOrderPurchase(
      address,
      ethers.parseEther(`${numberOfTokens}`)
    )
  }

  const buyProductWithTokens = async (tokens: string, transferTo: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.buyProductOrClaimReward(tokens, transferTo)
  }

  const approveTokens = async (tokens: string) => {
    const contract = await getTokenContractSigned()
    // const amount = ethers.parseEther(tokens)
    return contract.approve(LOYALTY_PROGRAM_ADDRESS, tokens, {
      from: walletAddress,
    })
  }

  return {
    getAccountBalance,
    totalSupply,
    settlementTransactions,
    addIssuer,
    issuerTransactions,
    numberOfIssuers,
    getTokenOnOrder,
    buyProductWithTokens,
    approveTokens,
  }
}