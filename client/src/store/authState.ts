import { atom } from 'recoil';

interface AuthState {
  id: string
  token: string
}

const authAtom = atom<AuthState | null>({
  key: 'auth',
  default: null,
});

export default authAtom;
