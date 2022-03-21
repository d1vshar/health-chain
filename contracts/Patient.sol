// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

// TODO Implement patients contract using array of contract addresses
contract Patient is AccessControl {
  address private uuid;

  constructor (address _uuid) {
    uuid = _uuid;
  }
}
