import { expect } from 'chai';
// import { id } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { ObjectData, Permission } from './types';

describe('HCObject', () => {
  it('Patient should have read, write & manage access', async () => {
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const patient = signers[1];

    // Using HCPatientContract cause HCObject is abstract.
    const patientContractFactory = await ethers.getContractFactory('HCPatientContract');

    const patientContract = await patientContractFactory.deploy(
      patient.address,
    );
    await patientContract.deployed();

    // read access
    let patientData = await patientContract.connect(patient).getData();
    expect(patientData.idStr).eq('');
    expect(patientData.hashStr).eq('');

    // write access
    const initData: ObjectData = {
      idStr: 'test-id-string',
      hashStr: 'test-hash-string',
    };
    await patientContract.connect(patient).setData(initData);
    patientData = await patientContract.connect(patient).getData();
    expect(patientData.idStr).eq(initData.idStr);
    expect(patientData.hashStr).eq(initData.hashStr);

    // manage access
    const permissionData: Permission = {
      r: 1,
      w: 0,
      m: 0,
    };
    await patientContract.connect(patient).setPermission(deployer.address, permissionData);
    const permission = await patientContract.connect(patient).getPermission(deployer.address);
    expect(permission.r).eq(1);
    expect(permission.w).eq(0);
    expect(permission.m).eq(0);
  });

  it('Calls by non-authorized addresses should be reverted.', async () => {
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const patient = signers[1];

    const patientContractFactory = await ethers.getContractFactory('HCPatientContract');

    const patientContract = await patientContractFactory.deploy(
      patient.address,
    );
    await patientContract.deployed();

    // This test is failing due to ethers.js - hardhat JSON-RPC response incompatibility
    // Discussion: https://github.com/ethers-io/ethers.js/discussions/2849
    // Fix PR: https://github.com/NomicFoundation/hardhat/pull/2553
    await expect(await patientContract.connect(deployer).getData()).to.be.reverted;
  });
});
