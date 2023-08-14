import { expect } from "chai"
import { LoyaltyProgram, Token } from "../typechain-types"
import { ethers } from "hardhat"

describe("LoyaltyProgram", async () => {
  let admin: any, brand: any, john: any, seller: any, bob: any
  let loyaltyProgram: LoyaltyProgram
  let tokenContract: Token
  let loyaltyContractAddress: string

  const INITIAL_TOKENS = 4000000
  const INITIAL_ISSUER_TOKENS = 50

  beforeEach(async () => {
    ;[admin, brand, john, bob, seller] = await ethers.getSigners()
  })

  it("should able to deploy the contract", async () => {
    const TokenContract = await ethers.getContractFactory("Token")
    tokenContract = await TokenContract.connect(admin).deploy(INITIAL_TOKENS)

    const LoyaltyProgram = await ethers.getContractFactory("LoyaltyProgram")
    loyaltyProgram = await LoyaltyProgram.deploy(
      await tokenContract.getAddress(),
      INITIAL_ISSUER_TOKENS
    )

    loyaltyContractAddress = await loyaltyProgram.getAddress()
  })

  it("initial tokens should be in admin account", async () => {
    const balance = await loyaltyProgram.accountBalance(admin)
    expect(
      balance,
      "Initial tokens of admin not equal to total supply"
    ).to.equal(ethers.parseEther(INITIAL_TOKENS.toString()))
  })

  describe("add issuer", () => {
    it("add issuer should be called by admin only", async () => {
      await expect(
        loyaltyProgram.connect(john).addIssuer(brand)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("admin should able to add issuer", async () => {
      await tokenContract.approve(
        await loyaltyProgram.getAddress(),
        ethers.parseEther(INITIAL_ISSUER_TOKENS.toString())
      )

      await expect(loyaltyProgram.connect(admin).addIssuer(brand)).to.emit(
        loyaltyProgram,
        "IssuerRecord"
      )
    })

    it("issuer count should be equal to number of issuer added", async () => {
      const issuersCount = await loyaltyProgram.numberOfIssuers()
      expect(
        issuersCount,
        "issuer count not match with number of issuers added"
      ).to.equal("1")
    })
  })

  describe("remove issuer", () => {
    it("remove issuer should be called by admin only", async () => {
      await expect(
        loyaltyProgram.connect(john).addIssuer(brand)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })

    it("admin should able to remove issuer", async () => {
      await expect(loyaltyProgram.connect(admin).removeIssuer(brand)).to.emit(
        loyaltyProgram,
        "IssuerRecord"
      )
    })

    it("issuer count should be equal to number of issuers", async () => {
      const issuersCount = await loyaltyProgram.numberOfIssuers()
      expect(
        issuersCount,
        "issuer count not match with number of issuers added"
      ).to.equal("0")
    })
  })

  describe("issue token to loyal users", async () => {
    it("only issuers should allowed to issue tokens to loyal users", async () => {
      const tokens = ethers.parseEther("2")
      await expect(
        loyaltyProgram.connect(john).issueTokenToLoyalUser(tokens, john)
      ).to.be.rejectedWith("Only authorized issuer can call this function")
    })

    it("issuers should able to issue tokens to loyal users", async () => {
      const tokens = ethers.parseEther("2")

      await tokenContract.approve(
        await loyaltyProgram.getAddress(),
        ethers.parseEther(INITIAL_ISSUER_TOKENS.toString())
      )

      await loyaltyProgram.connect(admin).addIssuer(brand)

      await tokenContract.connect(brand).approve(loyaltyContractAddress, tokens)

      await expect(
        loyaltyProgram.connect(brand).issueTokenToLoyalUser(tokens, john)
      ).to.emit(loyaltyProgram, "TokenToLoyalUser")
    })

    it("should not able to transfer the token greater than limit", async () => {
      const tokens = ethers.parseEther("20")

      await tokenContract.approve(
        await loyaltyProgram.getAddress(),
        ethers.parseEther(INITIAL_ISSUER_TOKENS.toString())
      )

      await loyaltyProgram.connect(admin).addIssuer(brand)

      await tokenContract
        .connect(brand)
        .approve(await loyaltyProgram.getAddress(), tokens)

      await expect(
        loyaltyProgram.connect(brand).issueTokenToLoyalUser(tokens, john)
      ).to.be.revertedWith(
        "You can only issue less than 10 tokens to loyal users"
      )
    })

    it("user should able to get the balance of account equal to number of transfered tokens", async () => {
      const tokens = ethers.parseEther("2")

      const balance = await loyaltyProgram.accountBalance(john)

      expect(balance).to.equal(tokens)
    })
  })

  describe("get tokens on orders", async () => {
    it("should not able to earn tokens if order amount is less than minimum order amount", async () => {
      const orderAmount = 1000
      const tokens = ethers.parseEther(`${(orderAmount * 0.25) / 100}`)

      await expect(
        loyaltyProgram
          .connect(john)
          .getTokensOnOrderPurchase(orderAmount, tokens)
      ).to.be.revertedWith(
        "Order amount must be greater than the minimum order amount"
      )
    })

    it("should able to get tokens on orders", async () => {
      const orderAmount = 3000
      const tokens = ethers.parseEther(`${(orderAmount * 0.25) / 100}`)

      await tokenContract.connect(bob).approve(loyaltyContractAddress, tokens)

      await expect(
        loyaltyProgram
          .connect(bob)
          .getTokensOnOrderPurchase(orderAmount, tokens)
      ).to.emit(loyaltyProgram, "GetTokenOnOrder")
    })
  })
})
