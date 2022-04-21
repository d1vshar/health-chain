// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCObject.sol";

abstract contract HCRecordContract is HCObject {
    string public recordType;

    constructor(address _owner) HCObject(_owner) {
        recordType = "VITALS";
    }
}
