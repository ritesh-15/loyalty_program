import { expect } from "chai"
import { LoyaltyProgram, Token } from "../typechain-types"
import { ethers } from "hardhat"

describe("LoyaltyProgram", async () => {
  let admin: any, brand: any, john: any, seller: any, bob: any, tom: any
  let loyaltyProgram: LoyaltyProgram
  let tokenContract: Token
  let loyaltyContractAddress: string

  const INITIAL_TOKENS = 4000000000
  const INITIAL_ISSUER_TOKENS = 100

  // ;[admin, brand, john, bob, seller] = await ethers.getSigners()
  beforeEach(async () => {
    ;[admin, brand, john, bob, seller, tom] = await ethers.getSigners()

    if (tokenContract) {
      await tokenContract.approve(
        loyaltyContractAddress,
        ethers.parseEther(INITIAL_TOKENS.toString())
      )
    }
  })

  it("should able to deploy contract", async () => {
    const TokenContract = await ethers.getContractFactory("Token")
    tokenContract = await TokenContract.deploy(
      ethers.parseEther(INITIAL_TOKENS.toString())
    )

    const LoyaltyProgram = await ethers.getContractFactory("LoyaltyProgram")

    loyaltyProgram = await LoyaltyProgram.deploy(
      await tokenContract.getAddress(),
      ethers.parseEther(INITIAL_ISSUER_TOKENS.toString())
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
      const orderAmount = 500
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

      // await tokenContract.approve(loyaltyContractAddress, tokens)

      const a = await tokenContract.allowance(admin, loyaltyContractAddress)
      console.log(ethers.formatEther(a))

      await expect(
        loyaltyProgram
          .connect(bob)
          .getTokensOnOrderPurchase(orderAmount, tokens)
      ).to.emit(loyaltyProgram, "GetTokenOnOrder")
    })

    it("should able to get the user account tokens", async () => {
      const balance = await loyaltyProgram.accountBalance(bob)
      const tokens = ethers.parseEther(`${(3000 * 0.25) / 100}`)

      expect(
        balance,
        "number of tokens of user not matched with the tokens received"
      ).to.equal(tokens)
    })
  })

  describe("Buy product or claim reward", async () => {
    it("should not able to claim reward if tokens are 0", async () => {
      const token = ethers.parseEther("0")
      await expect(
        loyaltyProgram.buyProductOrClaimReward(token, brand)
      ).to.be.revertedWith("Tokens should be greater than 0")
    })

    it("should not able to transfer tokens other than the issuer", async () => {
      const token = ethers.parseEther("15")

      await expect(
        loyaltyProgram.buyProductOrClaimReward(token, john)
      ).to.be.revertedWith(
        "Transfer to must be allowed issuers (brand or seller)"
      )
    })

    it("should  not able to traansfer tranfer the coin to brand", async () => {
      const tokens = ethers.parseEther("18")

      // await tokenContract.connect(bob).approve(loyaltyContractAddress, tokens)

      await expect(
        loyaltyProgram.connect(bob).buyProductOrClaimReward(tokens, brand)
      ).to.be.revertedWith(
        "User should have balance greater than number of tokens required!"
      )
    })

    it("should able to tranfer the coin to brand", async () => {
      const tokens = ethers.parseEther("7")

      await tokenContract.connect(bob).approve(loyaltyContractAddress, tokens)

      await expect(
        loyaltyProgram.connect(bob).buyProductOrClaimReward(tokens, brand)
      ).to.be.emit(loyaltyProgram, "TokensTransferred")
    })

    it("should deduct the tokens from users account", async () => {
      const balance = await loyaltyProgram.accountBalance(bob)
      expect(balance, "user account balance not match").to.be.equal(
        ethers.parseEther("0.5")
      )
    })
  })

  describe("Referral reward", () => {
    it("should not call referral reward if not admin", async () => {
      await expect(
        loyaltyProgram.connect(tom).referralReward(tom)
      ).to.be.rejectedWith("Ownable: caller is not the owner")
    })

    it("should able to call if admin", async () => {
      await expect(loyaltyProgram.referralReward(tom)).to.emit(
        loyaltyProgram,
        "Refferal"
      )
    })

    it("should able to get the reward at user account", async () => {
      const balance = await loyaltyProgram.accountBalance(tom)
      expect(balance).to.be.equal(ethers.parseEther("10"))
    })
  })
})
