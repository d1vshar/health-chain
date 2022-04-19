// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

contract HealthChainStorage {
  struct PatientData {
    string id;
    string hash;
  }

  struct DoctorData {
    string id;
    string hash;
  }

  struct HealthRecordData {
    string hash;
  }

  mapping (address => PatientData[]) public patientMap;
  mapping (address => DoctorData[]) public doctorMap;
  mapping (address => HealthRecordData[]) public recordMap;
}