// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCPermissionedContract.sol";

abstract contract HCObject is HCPermissionedContract {
    address private owner;
    string private id;

    modifier permission(
        int256 _r,
        int256 _w,
        int256 _m
    ) {
        require(
            isOwner(msg.sender) || validatePermission(msg.sender, _r, _w, _m),
            "NOT AUTHORIZED"
        );
        _;
    }

    function isOwner(address account) private view returns (bool) {
        return account == owner;
    }

    struct ObjectData {
        string id;
        string hash;
    }

    ObjectData private objectData;

    constructor(address _owner) {
        owner = _owner;
    }
}
