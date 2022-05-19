import { atom } from 'recoil';

export type AuthState = {
  id: string
  token: string
  publicAddress: string
  role: string
};

const authAtom = atom<AuthState | null>({
  key: 'auth',
  default: null,
});

export default authAtom;
