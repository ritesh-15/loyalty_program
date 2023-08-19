// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Token.sol";

contract LoyaltyProgram is Ownable {
    using Counters for Counters.Counter;

    Token private token;
    address private _admin;
    uint256 minimumOrderAmount;

    uint256 public initialIssuerTokens;
    uint256 public settlementRate;
    uint256 public decayPeriod;

    Counters.Counter public numberOfIssuers;

    // issuers can be brands or sellers or parters
    mapping(address => bool) private _allowedIssuers;

    // actions to the token mean how many tokens should be issues for particular actions
    mapping(string => uint256) private _actionToTokenRatio;

    // decay of tokens
    mapping(address => uint256) _lastTokenUsedByUser;

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

    event Refferal(address indexed user, uint256 tokens, uint256 timestamp);

    event TokenDecayed(address indexed user, uint256 tokens, uint256 timestamp);

    constructor(address _tokenAddress, uint256 _initialIssuerTokens) {
        token = Token(_tokenAddress);
        _admin = msg.sender;

        minimumOrderAmount = 1000;
        settlementRate = 25;
        decayPeriod = 30 days;

        initialIssuerTokens = _initialIssuerTokens;

        _actionToTokenRatio["LOYAL_USER_TOKENS"] = 10 * 10 ** 18;
        _actionToTokenRatio["REFERAL"] = 10 * 10 ** 18;
    }

    // get refferal reward rate
    function getRefferalRewardRate() external view returns (uint256) {
        return _actionToTokenRatio["REFERAL"];
    }

    // updaate referral reward rate
    function updateReferralRewardRate(uint256 reward) external onlyOwner {
        _actionToTokenRatio["REFERAL"] = reward;
    }

    // update settlement rate
    function updateSettlementRate(uint256 _newRate) external onlyOwner {
        settlementRate = _newRate;
    }

    // update decay period
    function updateDecayPeriod(uint256 _period) external onlyOwner {
        decayPeriod = _period;
    }

    // add issuer such as brands and sellers
    function addIssuer(address _address) external onlyOwner {
        _allowedIssuers[_address] = true;
        numberOfIssuers.increment();

        require(
            token.transferFrom(msg.sender, _address, initialIssuerTokens),
            "Tokens trasfered faile to the issuers account!"
        );

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

        require(
            token.transferFrom(msg.sender, _address, _tokens),
            "Tokens not transfered to the user account!"
        );

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

        require(_numberOfTokens > 0, "Number of tokens must be greater than 0");

        // setting the limit of transfering the tokens to be 100 even if order amount is large
        if (_numberOfTokens > 100 ether) _numberOfTokens = 100;

        // reward user for purchse
        require(
            token.transferFrom(_admin, msg.sender, _numberOfTokens),
            "Tokens not transfered to the user account!"
        );

        // decay tokens authomatically
        decayTokens(msg.sender);

        // update last used token times
        _lastTokenUsedByUser[msg.sender] = block.timestamp;

        emit GetTokenOnOrder(
            _numberOfTokens,
            _orderAmount,
            msg.sender,
            block.timestamp
        );
    }

    // referral reward
    function referralReward(address _refferedBy) external onlyOwner {
        require(
            token.transferFrom(
                _admin,
                _refferedBy,
                _actionToTokenRatio["REFERAL"]
            ),
            "Tokens cannot be trasfered"
        );

        emit Refferal(
            _refferedBy,
            _actionToTokenRatio["REFERAL"],
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
            _userBalance >= _tokens,
            "User should have balance greater than number of tokens required!"
        );

        uint256 settlementTokens = (_tokens * settlementRate) / 100;
        uint256 tokensToBrand = _tokens - settlementTokens;

        // transfer the tokens from user to brand or seller
        require(
            token.transferFrom(msg.sender, _transferTo, tokensToBrand),
            "Tokens not trasfered to the brand or seller account!"
        );

        // decay tokens authomatically
        decayTokens(msg.sender);

        // update last used token times
        _lastTokenUsedByUser[msg.sender] = block.timestamp;

        // initial the settlement between the brand and platform (i.e transfer some tokens from brand to platform)
        settlement(settlementTokens, msg.sender, _transferTo);

        emit TokensTransferred(
            msg.sender,
            _transferTo,
            _tokens,
            block.timestamp
        );
    }

    // authomatic decay of tokens
    function decayTokens(address _userAddress) internal {
        uint256 decayedTokens = calculateDecayedTokens(_userAddress);
        if (decayedTokens > 0) {
            _lastTokenUsedByUser[_userAddress] = block.timestamp;
            token.burn(_userAddress, decayedTokens);

            emit TokenDecayed(_userAddress, decayedTokens, block.timestamp);
        }
    }

    function calculateDecayedTokens(
        address _userAddress
    ) internal view returns (uint256) {
        uint256 lastUpdateTime = _lastTokenUsedByUser[_userAddress];
        if (lastUpdateTime == 0) {
            return 0;
        }

        uint256 timePassedSinceUpdate = block.timestamp - lastUpdateTime;

        if (timePassedSinceUpdate >= decayPeriod) {
            return ((accountBalance(_userAddress) * timePassedSinceUpdate) /
                decayPeriod);
        }

        return 0;
    }

    function settlement(
        uint256 _tokens,
        address _trasferFrom,
        address brandAddress
    ) internal {
        // calculate settelment tokens
        require(
            token.transferFrom(_trasferFrom, _admin, _tokens),
            "Tokens not trasfered to the admin account!"
        );

        emit SettlementRecord(brandAddress, _tokens, block.timestamp);
    }
}
