const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EhrRecord', () => {
  it('Should return the new vitals once it\'s changed', async () => {
    const EhrRecord = await ethers.getContractFactory('EhrRecord');
    const addrs = await ethers.getSigners();

    const record = await EhrRecord.deploy(addrs[1].address, addrs[2].address);
    await record.deployed();

    let data = await record.getData();
    expect(data.temp).to.equal(0);

    const setRecordData = await record.updateData({
      temp: 86,
      pulseRate: 98,
      respirationRate: 120,
      bpSystolic: 80,
      bpDiastolic: 120,
    });

    await setRecordData.wait();

    data = await record.getData();
    expect(data.temp).to.equal(86);
    expect(data.pulseRate).to.equal(98);
    expect(data.respirationRate).to.equal(120);
    expect(data.bpSystolic).to.equal(80);
    expect(data.bpDiastolic).to.equal(120);
  });

  it('Should grant roles correctly', async () => {
    const EhrRecord = await ethers.getContractFactory('EhrRecord');
    const addrs = await ethers.getSigners();

    const record = await EhrRecord.deploy(addrs[1].address, addrs[2].address);
    await record.deployed();

    // check read access for patient
    let data = await record.connect(addrs[1]).getData();
    expect(data.temp).to.equal(0);
    expect(data.pulseRate).to.equal(0);
    expect(data.respirationRate).to.equal(0);
    expect(data.bpSystolic).to.equal(0);
    expect(data.bpDiastolic).to.equal(0);

    // check write access for patient
    await expect(record.connect(addrs[1]).updateData({
      temp: 86,
      pulseRate: 98,
      respirationRate: 120,
      bpSystolic: 80,
      bpDiastolic: 120,
    })).to.be.reverted;

    // check read access for doctor
    data = await record.connect(addrs[2]).getData();
    expect(data.temp).to.equal(0);
    expect(data.pulseRate).to.equal(0);
    expect(data.respirationRate).to.equal(0);
    expect(data.bpSystolic).to.equal(0);
    expect(data.bpDiastolic).to.equal(0);

    // check write access for doctor
    const updateData = await (record.connect(addrs[2])).updateData({
      temp: 86,
      pulseRate: 98,
      respirationRate: 120,
      bpSystolic: 80,
      bpDiastolic: 120,
    });
    await updateData.wait();

    data = await record.connect(addrs[2].address).getData();
    expect(data.temp).to.equal(86);
    expect(data.pulseRate).to.equal(98);
    expect(data.respirationRate).to.equal(120);
    expect(data.bpSystolic).to.equal(80);
    expect(data.bpDiastolic).to.equal(120);
  });

  it('Should deny access to accounts with no roles granted', async () => {
    const EhrRecord = await ethers.getContractFactory('EhrRecord');
    const addrs = await ethers.getSigners();

    const record = await EhrRecord.deploy(addrs[1].address, addrs[2].address);
    await record.deployed();

    await expect(record.connect(addrs[3].address).getData()).to.be.reverted;
  });
});
