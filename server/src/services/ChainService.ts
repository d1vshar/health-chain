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
  }

  /**
   * mock hash fetch functions
   * #TODO replace with blockchain contract calls
   */
  public static async getPatientHash(id: string) {
    console.log(`fetch patient hash ${id}`);
    return 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
  }

  public static async getDoctorHash(id: string) {
    console.log(`fetch doctor hash ${id}`);
    return 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
  }

  public static async getRecordHash(id: string) {
    console.log(`fetch record hash ${id}`);
    return 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
  }
}
