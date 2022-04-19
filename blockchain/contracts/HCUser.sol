// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCPermissionedContract.sol";

abstract contract HCUser is HCPermissionedContract {
  address private owner;
  string public role = "USER";

  // TODO add modifier for authentication

  struct UserData {
    string id;
    string hash;
  }

  UserData private userData;

  constructor(address _owner) {
    owner = _owner;
  }
}