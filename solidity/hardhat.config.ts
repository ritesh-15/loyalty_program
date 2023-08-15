import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    alchemy: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/5rHFCUzjNhiqyDZSHVWGrBBzRgmieG-y",
      accounts: [
        "2147bf57ecf7c7b193da081f4781ef94b29b9ec7894ddffde74455c3df915d4e",
      ],
    },
  },
}

export default config
