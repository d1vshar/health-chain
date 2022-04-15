// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./RoleAccess.sol";

/*
 * This contract will hold public data about a patient.
 * Everyone can call read operations. Only Admins can call write operations. 
 */
contract Patient is AccessControl,  RoleAccess {
  address private owner;
  address private patientUuid;
  uint256 private createTime;

  struct PatientData {
    string fullName;
    string dob;
    string dod;
    string sex;
    string race;
  }

  PatientData private patientData;
  using EnumerableSet for EnumerableSet.AddressSet;
  EnumerableSet.AddressSet private records;


  constructor (address _patientUuid, uint256 _createTime) {
    patientUuid = _patientUuid;
    createTime = _createTime;
    owner = msg.sender;

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    grantRole(PATIENT_ROLE, patientUuid);
  }

  modifier allAccess() {
    require(hasWriteAccess(msg.sender), " doesn't have write access");
    _;
  }

  modifier onlyReadAccess() {
    require(true, " doesn't have read access");
    _;
  }

  function hasWriteAccess(address _uuid) public view returns (bool) {
    if (hasRole(DEFAULT_ADMIN_ROLE, _uuid)) {
      return true;
    }

    return false;
  }

  function getData() public view onlyReadAccess returns (PatientData memory) {
    return patientData;
  }

  function updateData(PatientData memory _patientData) public allAccess {
    patientData = _patientData;
  }

  function deleteSelf() public allAccess {
    address payable ownerPayable = payable(owner);
    selfdestruct(ownerPayable);
  }
}
