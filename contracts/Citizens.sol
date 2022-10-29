// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Citizens {
    mapping (uint256 => address) public address_by_id;
    mapping (address => uint256) public id_by_address;
    uint256 public population = 0;

    function register_citizen(address address_of_citizen) public {
        require(!is_citizen(address_of_citizen), "citizen already exists");
        population = population + 1;
        uint256 id = population;
        address_by_id[id] = address_of_citizen;
        id_by_address[address_of_citizen] = id;
    }

    function is_citizen(address address_of_citizen) public view returns(bool) {
        return id_by_address[address_of_citizen] > 0;
    }
}
