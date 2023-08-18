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

  const getAccountBalance = (address: string) => {
    const contract = getLoyaltyProgramContract()
    return contract.accountBalance(address)
  }

  const totalSupply = () => {
    const tokenContract = getTokenContract()
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

  const buyProductWithTokens = async (tokens: number, transferTo: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    const amount = ethers.parseEther(tokens.toString())
    return contract.buyProductOrClaimReward(amount, transferTo)
  }

  const approveTokens = async (tokens: number) => {
    const contract = await getTokenContractSigned()
    const amount = ethers.parseEther(tokens.toString())
    return contract.approve(LOYALTY_PROGRAM_ADDRESS, amount)
  }

  const getAllowance = async () => {
    const c = getTokenContract()
    return c.allowance(walletAddress, LOYALTY_PROGRAM_ADDRESS)
  }

  const getHistoryForPurchase = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["TokensTransferred"]())
  }

  const getTokenEarnedOnPurchase = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["GetTokenOnOrder"]())
  }

  const getSettlementsTransactions = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["SettlementRecord"]())
  }

  const getInitialIssuerTokens = () => {
    const contract = getLoyaltyProgramContract()
    return contract.initialIssuerTokens()
  }

  const getDecayPeriod = () => {
    const contract = getLoyaltyProgramContract()
    return contract.decayPeriod()
  }

  const getSettlementRate = () => {
    const contract = getLoyaltyProgramContract()
    return contract.settlementRate()
  }

  const updateSettlementRate = async (value: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.updateSettlementRate(value)
  }

  const issueTokenToLoaylUser = async (value: string, userAddress: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.issueTokenToLoyalUser(ethers.parseEther(value), userAddress)
  }

  const getLoyalUserTokenHistory = () => {
    const contract = getLoyaltyProgramContract()
    return contract.queryFilter(contract.filters["TokenToLoyalUser"]())
  }

  const giveRewardOnReferral = async (userAddress: string) => {
    const contract = await getLoyaltyProgramContractSigned()
    return contract.referralReward(userAddress)
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
    getAllowance,
    getHistoryForPurchase,
    getTokenEarnedOnPurchase,
    getSettlementsTransactions,
    getInitialIssuerTokens,
    getDecayPeriod,
    getSettlementRate,
    updateSettlementRate,
    issueTokenToLoaylUser,
    getLoyalUserTokenHistory,
    giveRewardOnReferral,
  }
}
