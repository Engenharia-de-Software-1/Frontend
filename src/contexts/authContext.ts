import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import * as auth from '../services/auth';
import {ResponseSignUp} from '../services/auth';
import {clear, get, set} from './store';

interface obj {
  id: string;
  name: string;
}

export type ISignUpCollaborator = auth.ISignUpCollaborator &
  auth.IAddFieldsToIdentification;

interface AuthContextData {
  signed: boolean;
  user: obj | null;
  signIn(data: auth.ISignIn): Promise<auth.ResponseSignIn | undefined>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<obj | null>(null);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<string>();
  const [education, setEducation] = useState<boolean>();
  const [signed, setSigned] = useState(false);

  async function signIn({
    email,
    password,
  }: auth.ISignIn): Promise<auth.ResponseSignIn | undefined> {
    const response = await auth.signIn({email, password});
    if (response) {
      setUser(response?.user);


      return response;
    } else {
      console.log('Erro login');
      return undefined;
    }
  }

  async function signOut() {
    await clear();
    setUser(null);
  }

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await get('@Newhappen:user');
      const storagedToken = await get('@Newhappen:token');
      const storagedCompany = await get('@Newhappen:company');
      const storagedModel = await get('@Newhappen:education');

      if (
        storagedUser &&
        storagedToken &&
        storagedCompany &&
        storagedModel !== undefined
      ) {
        setUser(JSON.parse(storagedUser));
        setCompany(storagedCompany);
        setEducation(storagedModel);
        setSigned(true);
      }

      setLoading(false);
    }

    loadStorageData();
  }, [user, loading, company, education, signed]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
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
