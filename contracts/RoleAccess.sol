// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleAccess {
  bytes32 public constant PATIENT_ROLE = keccak256("PATIENT");
  bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR");
}
