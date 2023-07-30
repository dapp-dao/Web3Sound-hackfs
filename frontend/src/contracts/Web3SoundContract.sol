// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Web3SoundContract {
    mapping(address => uint256) public tokenBalances;
    address public helloERC20ContractAddress = 0xCD84DfFA81A1879164052015116FFeAB0A52Cfd4;

    constructor() {}

    function transfer(address to, uint256 amount) virtual internal returns (bool);
    function transferFrom(address from, address to, uint256 amount) virtual internal returns (bool);

    function createUserProfile() public {
        uint256 amount = 2e17;
        transfer(msg.sender, amount);
        tokenBalances[msg.sender] += amount;
    }

    function followCreator(address creator) public {
        address user = msg.sender;
        uint256 amount = 1e15;
        require(tokenBalances[user] >= amount, "Insufficient token balance");
        transferFrom(user, creator, amount);
        tokenBalances[user] -= amount;
        tokenBalances[creator] += amount;
    }
}
