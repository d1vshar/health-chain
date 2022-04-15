// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleAccess.sol";

// Individual Data storage contract for each record
contract Record is AccessControl, RoleAccess {
  address private owner;
  address private patientUuid;
  address private doctorUuid;
  uint256 private createTime;

  struct RecordData {
    uint8 temp;
    uint8 pulseRate;
    uint8 respirationRate;
    uint8 bpSystolic;
    uint8 bpDiastolic;
  }

  // TODO this isn't private. 
  // no data on smart contracts is private regardless of modifiers.
  RecordData private recordData;

  constructor(address _patientUuid, address _doctorUuid, uint256 _createTime) {
    patientUuid = _patientUuid;
    doctorUuid = _doctorUuid;
    createTime = _createTime;
    owner = msg.sender;

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    grantRole(PATIENT_ROLE, patientUuid);
    grantRole(DOCTOR_ROLE, doctorUuid);
  }

  modifier allAccess() {
    require(hasWriteAccess(msg.sender), " doesn't have write access");
    _;
  }

  modifier onlyReadAccess() {
    require(hasReadAccess(msg.sender), " doesn't have read access");
    _;
  }

  function hasReadAccess(address _uuid) public view returns (bool) {
    if (
      hasRole(PATIENT_ROLE, _uuid) ||
      hasRole(DOCTOR_ROLE, _uuid) ||
      hasRole(DEFAULT_ADMIN_ROLE, _uuid)
    ) {
      return true;
    }

    return false;
  }

  function hasWriteAccess(address _uuid) public view returns (bool) {
    if (
      hasRole(DOCTOR_ROLE, _uuid) ||
      hasRole(DEFAULT_ADMIN_ROLE, _uuid)
    ) {
      return true;
    }

    return false;
  }

  function getData() public view onlyReadAccess returns (RecordData memory) {
    return recordData;
  }

  function updateData(RecordData memory _recordData) public allAccess {
    recordData = _recordData;
  }

  function deleteSelf() public allAccess {
    address payable ownerPayable = payable(owner);
    selfdestruct(ownerPayable);
  }
}
