// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./HCPermissionedContract.sol";

abstract contract HCObject is HCPermissionedContract {
    constructor(address _owner) {
        permissionMap[_owner] = Permission(1, 1, 1);
    }

    struct ObjectData {
        string idStr;
        string hashStr;
    }

    ObjectData internal objectData;

    function getData() external permission(1, 0, 0) view returns(ObjectData memory) {
        return objectData;
    }

    function setData(ObjectData memory _objectData) external permission(1, 1, 0) {
        objectData = _objectData;
    }
}
