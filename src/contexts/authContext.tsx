import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import * as auth from '../services/auth';
import {clear, get, set} from './store';

interface AuthContextData {
  user: string;
  signIn(data: auth.ISignIn): Promise<auth.IResponseSignIn | undefined>;
  signUp(data: auth.ISignUp): Promise<auth.IResponseSignIn | undefined>;
  signOut(): void;
  type: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<string>('');
  const [type, setType] = useState<string | null>(null);

  async function signIn({
    email,
    password,
  }: auth.ISignIn): Promise<auth.IResponseSignIn | undefined> {
    const response = await auth.signIn({email, password});
    if (response) {
      setUser(response?.user);
      set('@agroi9:user', JSON.stringify(response?.user));
      set('@agroi9:type', JSON.stringify(response?.type));

      return response;
    } else {
      return undefined;
    }
  }

  async function signUp({
    path,
    data
  }: auth.ISignUp): Promise<auth.IResponseSignIn | undefined> {
    const response = await auth.signUp({path, data});
    if (response) {
      setUser(response?.user);
      set('@agroi9:token', response?.token);
      set('@agroi9:user', JSON.stringify(response?.user));
      set('@agroi9:type', JSON.stringify(response?.type));

      return response;
    } else {
      return undefined;
    }
  }

  async function signOut() {
    clear();
    setUser('');
  }

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = get('@agroi9:user');
      const storagedToken = get('@agroi9:token');
      const storagedType = get('@agroi9:type');

      if (storagedUser && storagedToken && storagedType) {
        setUser(JSON.parse(storagedUser));
        setType(JSON.parse(storagedType));
      }
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        type,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthContext, useAuth};
