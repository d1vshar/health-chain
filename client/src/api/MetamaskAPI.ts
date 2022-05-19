import { ethers } from 'ethers';

export default class MetamaskAPI {
  provider: ethers.providers.Web3Provider;

  signer: ethers.providers.JsonRpcSigner;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.signer = this.provider.getSigner();
  }

  async requestMetamaskAccess() {
    if (this.provider) {
      await this.provider.send(
        'eth_requestAccounts',
        [],
      );
    }
  }

  async signNonce(nonce: string): Promise<string | null> {
    if (this.provider) {
      return this.signer.signMessage(nonce);
    }

    return null;
  }

  async signIn(nonce: string) {
    await this.requestMetamaskAccess();
    return this.signNonce(nonce);
  }
}
