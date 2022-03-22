const { expect } = require('chai');
const { ethers } = require('hardhat');

function mockData() {
  return {
    fullName: 'Divyanshu Sharma',
    dob: '2000/01/01',
    dod: '',
    sex: 'Male',
    race: 'South Asian - Indian',
  };
}

function mockTimestamp() {
  return Math.floor(Date.now() / 1000);
}

describe('Patient', () => {
  it('Should give read & write access to admins', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Patient = await ethers.getContractFactory('Patient');
    const addrs = await ethers.getSigners();

    const patient = await Patient.deploy(addrs[1].address, timestamp);
    await patient.deployed();

    let data = await patient.getData();
    expect(data.fullName).to.equal('');
    expect(data.dob).to.equal('');
    expect(data.dod).to.equal('');
    expect(data.sex).to.equal('');
    expect(data.race).to.equal('');

    const setRecordData = await patient.updateData(payload);
    await setRecordData.wait();

    data = await patient.getData();
    expect(data.fullName).to.equal(payload.fullName);
    expect(data.dob).to.equal(payload.dob);
    expect(data.dod).to.equal(payload.dod);
    expect(data.sex).to.equal(payload.sex);
    expect(data.race).to.equal(payload.race);
  });

  it('Should only give read access to everyone', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Patient = await ethers.getContractFactory('Patient');
    const addrs = await ethers.getSigners();

    const patient = await Patient.deploy(addrs[1].address, timestamp);
    await patient.deployed();

    const data = await patient.connect(addrs[2]).getData();
    expect(data.fullName).to.equal('');
    expect(data.dob).to.equal('');
    expect(data.dod).to.equal('');
    expect(data.sex).to.equal('');
    expect(data.race).to.equal('');

    await expect(patient.connect(addrs[2]).updateData(payload)).to.be.reverted;
  });
});
