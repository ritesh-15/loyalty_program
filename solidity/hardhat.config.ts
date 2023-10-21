import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    alchemy: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY || ""],
    },
    fugi: {
      url: process.env.AVALANCH_NETWORK,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY || ""],
    },
  },
}

export default config
