// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC20, Ownable {
    string NAME = "Flipkart Coin";
    string SYMBOL = "FC";
    uint256 DECIMALS = 18;
    uint256 _totalSupply = 0;

    constructor(uint256 initialSupply) ERC20(NAME, SYMBOL) {
        _totalSupply = initialSupply * 10 ** uint256(DECIMALS);
        _mint(msg.sender, _totalSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
