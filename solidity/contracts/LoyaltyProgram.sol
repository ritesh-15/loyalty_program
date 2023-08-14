// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram is Ownable {
    using Counters for Counters.Counter;

    IERC20 private token;
    address private _admin;
    uint256 minimumOrderAmount;

    uint256 initialIssuerTokens;

    // issuers can be brands or sellers or parters
    mapping(address => bool) private _allowedIssuers;

    Counters.Counter public numberOfIssuers;

    // actions to the token mean how many tokens should be issues for particular actions
    mapping(string => uint256) private _actionToTokenRatio;

    modifier onlyIssuer() {
        require(
            _allowedIssuers[msg.sender],
            "Only authorized issuer can call this function"
        );
        _;
    }

    // events

    event GetTokenOnOrder(
        uint256 numberOfTokens,
        uint256 orderAmount,
        address indexed user,
        uint256 timestamp
    );

    event TokensTransferred(
        address indexed user,
        address indexed transferTo,
        uint256 tokens,
        uint256 timestamp
    );

    event SettlementRecord(
        address indexed tranferFrom,
        uint256 tokens,
        uint256 timestamp
    );

    event IssuerRecord(
        address indexed issuer,
        uint256 tokens,
        uint256 timestamp,
        bool isAdded
    );

    event TokenToLoyalUser(
        address indexed issuer,
        address indexed user,
        uint256 tokens,
        uint256 timestamp
    );

    constructor(address _tokenAddress, uint256 _initialIssuerTokens) {
        token = IERC20(_tokenAddress);
        _admin = msg.sender;
        minimumOrderAmount = 2000;

        initialIssuerTokens = _initialIssuerTokens * 10 ** 18;

        // set the actions like referral, purchase or any other
        _actionToTokenRatio["PURCHASE"] = 0.25 * 10 ** 18;
        _actionToTokenRatio["REFERRAL"] = 5 * 10 ** 18;
        _actionToTokenRatio["LOYAL_USER_TOKENS"] = 10 * 10 ** 18;
    }

    // add approval for all the token to be transfered
    function giveApproval() external onlyOwner {
        bool result = token.approve(address(this), token.totalSupply());
        require(result, "give approval for all the token to be transfered");
    }

    // add issuer such as brands and sellers
    function addIssuer(address _address) external onlyOwner {
        _allowedIssuers[_address] = true;
        numberOfIssuers.increment();

        token.transferFrom(msg.sender, _address, initialIssuerTokens);

        emit IssuerRecord(_address, initialIssuerTokens, block.timestamp, true);
    }

    // remove issuer such as brand ans sellers
    function removeIssuer(address _address) external onlyOwner {
        _allowedIssuers[_address] = false;
        numberOfIssuers.decrement();

        emit IssuerRecord(
            _address,
            initialIssuerTokens,
            block.timestamp,
            false
        );
    }

    // issue token to users
    function issueTokenToLoyalUser(
        uint256 _tokens,
        address _address
    ) external onlyIssuer {
        require(
            _actionToTokenRatio["LOYAL_USER_TOKENS"] > _tokens,
            "You can only issue less than 10 tokens to loyal users"
        );
        token.transferFrom(msg.sender, _address, _tokens);

        emit TokenToLoyalUser(msg.sender, _address, _tokens, block.timestamp);
    }

    // balance of account
    function accountBalance(address _address) public view returns (uint256) {
        return token.balanceOf(_address);
    }

    // purchase product action
    function getTokensOnOrderPurchase(
        uint256 _orderAmount,
        uint256 _numberOfTokens
    ) external {
        require(
            _orderAmount >= minimumOrderAmount,
            "Order amount must be greater than the minimum order amount"
        );

        require(
            _numberOfTokens < 100 * 10 ** 18,
            "Cannot allocated more than 100 tokens"
        );

        // reward user for purchse
        token.transferFrom(_admin, msg.sender, _numberOfTokens);

        emit GetTokenOnOrder(
            _numberOfTokens,
            _orderAmount,
            msg.sender,
            block.timestamp
        );
    }

    // buy product / reward with tokens
    function buyProductOrClaimReward(
        uint256 _tokens,
        address _transferTo
    ) external {
        require(_tokens > 0, "Tokens should be greater than 0");

        require(
            _allowedIssuers[_transferTo],
            "Transfer to must be allowed issuers (brand or seller)"
        );

        uint256 _userBalance = accountBalance(msg.sender);

        require(
            _userBalance > _tokens,
            "User should have balance greater than number of tokens required!"
        );

        // transfer the tokens from user to brand or seller
        token.transferFrom(msg.sender, _transferTo, _tokens);

        // initial the settlement between the brand and platform (i.e transfer some tokens from brand to platform)
        settlement(_tokens, _transferTo);

        emit TokensTransferred(
            msg.sender,
            _transferTo,
            _tokens,
            block.timestamp
        );
    }

    function settlement(uint256 _tokens, address _trasferFrom) internal {
        // calculate settelment tokens
        uint256 settlementTokens = (_tokens * 25) / 100;

        token.transferFrom(_trasferFrom, _admin, settlementTokens);

        emit SettlementRecord(_trasferFrom, _tokens, block.timestamp);
    }
}
