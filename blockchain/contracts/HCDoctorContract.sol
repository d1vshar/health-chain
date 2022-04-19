// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCUser.sol";

contract HCDoctorContract is HCUser {
  constructor(address _owner) HCUser(_owner) {
    role = "DOCTOR";
  }
}
