// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./HCRecordContract.sol";
import "./HCPatientContract.sol";
import "./HCDoctorContract.sol";

abstract contract HCFactory {
    address private _admin;

    modifier adminOnly() {
        require(_admin == msg.sender, "NOT AUTHORIZED");
        _;
    }

    event RecordCreated(address _address);
    event PatientCreated(address _address);
    event DoctorCreated(address _address);

    constructor(address _owner) {
        _admin = _owner;
    }

    function createRecord(address patient) external adminOnly returns(address) {
        HCRecordContract newRecord = new HCRecordContract(patient);

        emit RecordCreated(address(newRecord));

        return address(newRecord);
    }

    function createPatient(address patient) external adminOnly returns(address) {
        HCPatientContract newRecord = new HCPatientContract(patient);

        emit PatientCreated(address(newRecord));

        return address(newRecord);
    }

    function createDoctor(address doctor) external adminOnly returns(address) {
        HCDoctorContract newRecord = new HCDoctorContract(doctor);

        emit DoctorCreated(address(newRecord));

        return address(newRecord);
    }
}
