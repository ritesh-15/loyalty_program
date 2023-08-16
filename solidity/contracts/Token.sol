// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC20, Ownable {
    string NAME = "Flipkart Coin";
    string SYMBOL = "FC";
    uint256 DECIMALS = 18;

    constructor(uint256 initialSupply) ERC20(NAME, SYMBOL) {
        _mint(msg.sender, initialSupply);
    }

    function burn(address _address, uint256 _amount) external {
        require(
            balanceOf(_address) >= _amount,
            "user does not have enough balance"
        );

        _burn(_address, _amount);
    }
}
