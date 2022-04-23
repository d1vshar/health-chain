import axios from "axios";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// console.log(wallet.address);
// const publicAddress = wallet.address;

export const signUp = async () => {
  const publicAddress = await provider.listAccounts();
  console.log(publicAddress[0]);
  const res = await axios.post(`http://localhost:8000/api/user/register`, {
    publicAddress: publicAddress[0].toLowerCase(),
    nonce: Math.floor(Math.random() * 1000000),
    username: "test2",
  });
  if (!res) return null;
  return res.data;
};

// eslint-disable-next-line import/prefer-default-export
export const signIn = async () => {
  const publicAddress = await provider.listAccounts();
  const res = await axios.get(
    `http://localhost:8000/api/user/${publicAddress[0]}`
  );
  if (!res) {
    // await signUp();
    return null;
  }
  return res.data;
};
