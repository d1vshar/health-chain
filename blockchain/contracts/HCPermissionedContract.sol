// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

abstract contract HCPermissionedContract {
  struct Permission {
    int r;
    int w;
    int m;
  }

  mapping (address => Permission) private permissionMap;

  function setPermission(address account, Permission calldata _permission) public {
    permissionMap[account] = _permission;
  }

  function getPermission(address account) public view returns(Permission memory) {
    return permissionMap[account];
  }

  function validatePermission(address account, int _r, int _w, int _m) internal view returns(bool) {
    bool flag = true;
  
    Permission memory p = getPermission(account);
    if (p.r != _r) flag = false;
    else if (p.w != _w) flag = false;
    else if (p.m != _m) flag = false;
  
    return flag;
  }
}