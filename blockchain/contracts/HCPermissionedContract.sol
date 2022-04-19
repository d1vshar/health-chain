// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

abstract contract HCPermissionedContract {
  struct Permission {
    bool r;
    bool w;
    bool m;
  }

  mapping (address => Permission) private permissionMap;


  function setPermission(address account, Permission calldata _permission) public {
    permissionMap[account] = _permission;
  }

  function getPermission(address account) public view returns(Permission memory) {
    return permissionMap[account];
  }
}