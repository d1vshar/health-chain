// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCPermissionedContract.sol";

abstract contract HCUser is HCPermissionedContract {
  address private owner;
  string public role = "USER";
  string private id;

  modifier permission(int _r, int _w, int _m) {
    require(isOwner(msg.sender) || validatePermission(msg.sender, _r, _w, _m), "NOT AUTHORIZED");
    _;
  }

  function isOwner(address account) private view returns(bool) {
    return account == owner;
  }

  struct UserData {
    string id;
    string hash;
  }

  UserData private userData;

  constructor(address _owner) {
    owner = _owner;
    role = "USER";
  }
}