// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoleAccess.sol";

// TODO Implement doctors contract using array of contract addresses
contract Doctor is Ownable {
  address uuid;

  constructor (address _uuid) {
    uuid = _uuid;
    // _setRoleAdmin(DOCTOR_ROLE, DEFAULT_ADMIN_ROLE);
    // _setupRole();
  }
}
