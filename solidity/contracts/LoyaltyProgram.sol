// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LoyaltyProgram is Ownable {
    Token private token;
    address private _admin;

    // issuers can be brands or sellers or parters
    mapping(address => bool) private _allowedIssuers;

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

    constructor(address _tokenAddress) {
        token = Token(_tokenAddress);
        _admin = msg.sender;

        // set the actions like referral, purchase or any other
        _actionToTokenRatio["PURCHASE"] = 1;
        _actionToTokenRatio["REFERRAL"] = 5;
        _actionToTokenRatio["LOYAL_USER_TOKENS"] = 50;
    }

    // add issuer such as brands and sellers
    function addIssuer(address _address) external onlyOwner {
        _allowedIssuers[_address] = true;
    }

    // remove issuer such as brand ans sellers
    function removeIssuer(address _address) external onlyOwner {
        _allowedIssuers[_address] = false;
    }

    // issue token to users
    function issueTokenToLoyalUser(uint256 _tokens) external onlyIssuer {
        require(
            _actionToTokenRatio["LOYAL_USER_TOKENS"] < _tokens,
            "You can only issue less than 50 tokens to loyal users"
        );
    }

    // balance of account
    function accountBalance(address _address) public returns (uint256) {
        return token.balanceOf(_address);
    }

    // purchase product action
    function getTokensOnOrderPurchase(uint256 _orderAmount) external {
        uint256 numberOfTokens = (_orderAmount *
            _actionToTokenRatio["PURCHASE"]) / 100;

        // reward user for purchse
        token.transferFrom(_admin, msg.sender, numberOfTokens);

        emit GetTokenOnOrder(
            numberOfTokens,
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

    function settlement(
        uint256 _tokens,
        address _trasferFrom
    ) internal onlyIssuer {
        // calculate settelment tokens
        uint256 settlementTokens = (_tokens * 25) / 100;

        token.transferFrom(_trasferFrom, _admin, settlementTokens);

        emit SettlementRecord(_trasferFrom, _tokens, block.timestamp);
    }
}
