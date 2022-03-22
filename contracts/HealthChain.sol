// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

import "./RoleAccess.sol";
import "./Doctor.sol";
import "./Patient.sol";
import "./Record.sol";

// TODO This contract will be used to spawn and destroy other contracts (Factory pattern). 
// The address of this contract will be used to deploy other contracts.
// A set of addresses of doctors is needed for authorization check.
// Further operations will occur through spawned contracts.
contract HealthChain is AccessControl, RoleAccess {
  address private owner;

  constructor() {
    owner = msg.sender;

    _grantRole(DEFAULT_ADMIN_ROLE, owner);
  }

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), " does not have admin access");
    _;
  }

  function addNewDoctor() public {

  }

  function addNewPatient() public onlyAdmin {

  }

  function addNewRecord() public {

  }

  // TODO destruct record contract, remove entry from patient and doctors
  function removeRecord() public onlyAdmin {

  }
}
