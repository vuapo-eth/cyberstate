// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Citizens.sol";

contract CyberCoins is ERC20 {
    mapping (uint256 => uint256) public timestamp_registered_by_citizen;
    address address_citizens;

    constructor(address _address_citizens) ERC20("CyberCoins", "CC") {
        address_citizens = _address_citizens;
    }
    
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function register_citizen(address address_of_citizen) public {
        uint256 citizen_id = Citizens(address_citizens).id_by_address(address_of_citizen);
        require(citizen_id > 0, "not a citizen");
        require(timestamp_registered_by_citizen[citizen_id] == 0, "already registered");
        timestamp_registered_by_citizen[citizen_id] = block.timestamp;
    }

    function withdraw() public {
        uint256 citizen_id = Citizens(address_citizens).id_by_address(msg.sender);
        require(citizen_id > 0, "not a citizen");
        uint256 time_period = block.timestamp - timestamp_registered_by_citizen[citizen_id];
        timestamp_registered_by_citizen[citizen_id] = block.timestamp;
        _mint(msg.sender, time_period * 1000000);
    }
}