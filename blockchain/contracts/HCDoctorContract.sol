// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./HCObject.sol";

contract HCDoctorContract is HCObject {
    string public role;

    constructor(address _owner) HCObject(_owner) {
        role = "DOCTOR";
    }
}
