export const formatWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}....${address.slice(address.length - 6)}`
}
