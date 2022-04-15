// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./RoleAccess.sol";

/*
 * This contract will hold public data about a doctor.
 * Everyone can call read operations. Only Admins can call write operations.
 */
contract Doctor is AccessControl, RoleAccess {
  address private owner;
  address private doctorUuid;
  uint256 private createTime;

  struct DoctorData {
    string fullName;
    string dob;
    string dod;
    string sex;
    string race;
    string[] reg;
  }

  DoctorData private doctorData;

  using EnumerableSet for EnumerableSet.AddressSet;
  EnumerableSet.AddressSet private records;

  constructor(address _doctorUuid, uint256 _createTime) {
    doctorUuid = _doctorUuid;
    createTime = _createTime;
    owner = msg.sender;

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    grantRole(DOCTOR_ROLE, doctorUuid);
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

  function getData() public view onlyReadAccess returns (DoctorData memory) {
    return doctorData;
  }

  function updateData(DoctorData memory _doctorData) public allAccess {
    doctorData = _doctorData;
  }

  function deleteSelf() public allAccess {
    address payable ownerPayable = payable(owner);
    selfdestruct(ownerPayable);
  }
}
