import { expect } from 'chai';
import { ethers } from 'hardhat';

function mockData() {
  return {
    fullName: 'Dr. Uncle Sam',
    dob: '1970/01/01',
    dod: '',
    sex: 'Male',
    race: 'American - White',
    reg: ['56023923412 - American Medical Association'],
  };
}

function mockTimestamp() {
  return Math.floor(Date.now() / 1000);
}

describe('Doctor', () => {
  it('Should give read & write access to admins ', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Doctor = await ethers.getContractFactory('Doctor');
    const addrs = await ethers.getSigners();

    const doctor = await Doctor.deploy(addrs[1].address, timestamp);
    await doctor.deployed();

    let data = await doctor.getData();
    expect(data.fullName).to.equal('');
    expect(data.dob).to.equal('');
    expect(data.dod).to.equal('');
    expect(data.sex).to.equal('');
    expect(data.race).to.equal('');
    expect(data.reg).to.have.members([]);

    const setRecordData = await doctor.updateData(payload);
    await setRecordData.wait();

    data = await doctor.getData();
    expect(data.fullName).to.equal(payload.fullName);
    expect(data.dob).to.equal(payload.dob);
    expect(data.dod).to.equal(payload.dod);
    expect(data.sex).to.equal(payload.sex);
    expect(data.race).to.equal(payload.race);
    expect(data.reg).to.have.members(payload.reg);
  });

  it('Should only give read access to everyone', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Doctor = await ethers.getContractFactory('Doctor');
    const addrs = await ethers.getSigners();

    const doctor = await Doctor.deploy(addrs[1].address, timestamp);
    await doctor.deployed();

    const data = await doctor.connect(addrs[2]).getData();
    expect(data.fullName).to.equal('');
    expect(data.dob).to.equal('');
    expect(data.dod).to.equal('');
    expect(data.sex).to.equal('');
    expect(data.race).to.equal('');
    expect(data.reg).to.have.members([]);

    await expect(doctor.connect(addrs[2]).updateData(payload)).to.be.reverted;
  });
});
