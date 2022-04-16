import { ethers } from 'ethers';

export default class ChainService {
  public static readonly provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');

  public static async getSignerAddress() {
    const wallet = new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', this.provider);
    console.log(ethers.utils.formatEther(await wallet.getBalance()));
    console.log('address:', wallet.address);

    const tx = await wallet.sendTransaction({
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: ethers.utils.parseEther('100.0'),
    });

    console.log(tx);

    // console.log('mnemonic:', wallet.mnemonic.phrase);
    // console.log('privateKey:', wallet.privateKey);
    // console.log(await this.provider.getBalance(await signer.getAddress()));
  }
}
