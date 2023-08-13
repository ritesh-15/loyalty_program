// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC20, Ownable {
    string name = "Flipkart Coin";
    string symbol = "FC";
    uint8 decimals = 18;
    uint256 totalSupply = 0;

    constructor(uint256 initialSupply, uint _decayPeriod) ERC20(name, symbol) {
        totalSupply = initialSupply * 10 ** uint256(decimals);
        _mint(msg.sender, totalSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
