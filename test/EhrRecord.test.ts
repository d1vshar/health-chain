import { expect } from 'chai';
import { ethers } from 'hardhat';

function mockData() {
  return {
    temp: 86,
    pulseRate: 98,
    respirationRate: 65,
    bpSystolic: 80,
    bpDiastolic: 120,
  };
}

function mockTimestamp() {
  return Math.floor(Date.now() / 1000);
}

describe('Record', () => {
  it('Should return the new vitals once it\'s changed', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Record = await ethers.getContractFactory('Record');
    const addrs = await ethers.getSigners();

    const record = await Record.deploy(addrs[1].address, addrs[2].address, timestamp);
    await record.deployed();

    let data = await record.getData();
    expect(data.temp).to.equal(0);
    expect(data.pulseRate).to.equal(0);
    expect(data.respirationRate).to.equal(0);
    expect(data.bpSystolic).to.equal(0);
    expect(data.bpDiastolic).to.equal(0);

    const setRecordData = await record.updateData(payload);

    await setRecordData.wait();

    data = await record.getData();
    expect(data.temp).to.equal(payload.temp);
    expect(data.pulseRate).to.equal(payload.pulseRate);
    expect(data.respirationRate).to.equal(payload.respirationRate);
    expect(data.bpSystolic).to.equal(payload.bpSystolic);
    expect(data.bpDiastolic).to.equal(payload.bpDiastolic);
  });

  // TODO split this test
  it('Should grant roles correctly', async () => {
    const payload = mockData();
    const timestamp = mockTimestamp();

    const Record = await ethers.getContractFactory('Record');
    const addrs = await ethers.getSigners();

    const record = await Record.deploy(addrs[1].address, addrs[2].address, timestamp);
    await record.deployed();

    // check read access for patient
    let data = await record.connect(addrs[1]).getData();
    expect(data.temp).to.equal(0);
    expect(data.pulseRate).to.equal(0);
    expect(data.respirationRate).to.equal(0);
    expect(data.bpSystolic).to.equal(0);
    expect(data.bpDiastolic).to.equal(0);

    // check write access for patient
    await expect(record.connect(addrs[1]).updateData(payload)).to.be.reverted;

    // check read access for doctor
    data = await record.connect(addrs[2]).getData();
    expect(data.temp).to.equal(0);
    expect(data.pulseRate).to.equal(0);
    expect(data.respirationRate).to.equal(0);
    expect(data.bpSystolic).to.equal(0);
    expect(data.bpDiastolic).to.equal(0);

    // check write access for doctor
    const updateData = await (record.connect(addrs[2])).updateData(payload);
    await updateData.wait();

    data = await record.connect(addrs[2].address).getData();
    expect(data.temp).to.equal(payload.temp);
    expect(data.pulseRate).to.equal(payload.pulseRate);
    expect(data.respirationRate).to.equal(payload.respirationRate);
    expect(data.bpSystolic).to.equal(payload.bpSystolic);
    expect(data.bpDiastolic).to.equal(payload.bpDiastolic);
  });

  // TODO add write access check
  it('Should deny access to accounts with no roles granted', async () => {
    const timestamp = mockTimestamp();

    const Record = await ethers.getContractFactory('Record');
    const addrs = await ethers.getSigners();

    const record = await Record.deploy(addrs[1].address, addrs[2].address, timestamp);
    await record.deployed();

    await expect(record.connect(addrs[3].address).getData()).to.be.reverted;
  });
});
