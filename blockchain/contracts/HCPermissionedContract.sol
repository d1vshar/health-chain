// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

abstract contract HCPermissionedContract {
    struct Permission {
        int256 r;
        int256 w;
        int256 m;
    }

    mapping(address => Permission) internal permissionMap;

    modifier permission(
        int256 _r,
        int256 _w,
        int256 _m
    ) {
        require(validatePermission(msg.sender, _r, _w, _m), "Not authorized to call method");
        _;
    }

    function setPermission(address account, Permission memory _permission)
        external
        permission(1, 1, 1)
    {
        permissionMap[account] = _permission;
    }

    function getPermission(address account)
        external
        view
        permission(1, 0, 0)
        returns (Permission memory)
    {
        return permissionMap[account];
    }

    function validatePermission(
        address account,
        int256 _r,
        int256 _w,
        int256 _m
    ) internal view returns (bool) {
        bool flag = true;

        Permission memory p = permissionMap[account];

        if (p.r < _r) flag = false;
        else if (p.w < _w) flag = false;
        else if (p.m < _m) flag = false;

        return flag;
    }
}
