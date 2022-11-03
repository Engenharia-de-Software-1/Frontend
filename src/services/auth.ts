import { IUser } from '../models/IUser';
import api from './api';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import { ICadastro } from '../pages/cadastro';
import { get } from '../contexts/store';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  path: string;
  data: ICadastro;
}

export interface IResponseSignIn {
  token: string;
  user: IUser;
  type: string;
}

export interface IResponseSignUp {
  token: string;
  user: IUser;
  type: string;
  completed: boolean;
}

// Interface usada para decodificar o payload do token.
interface IPayload extends JwtPayload {
  userId: string;
}

// Interface criada para saber o tipo do usuário. Isso será usado para
// configurar a sidebar, por exemplo.
interface IType extends IUser {
  client: Object | null;
  startup: Object | null;
  investor: Object | null;
}

export interface ILoadResponse {
  user: any;
  type: string;
  token: string;
  id: string;
}

// Função chamada pelo contexto de autenticação para fazer o login.
export async function signIn({
  email,
  password,
}: ISignIn): Promise<IResponseSignIn | undefined> {
  const response = await api.post('/login', {
    email,
    password,
  });

  if (response.status.toString().startsWith('2')) {
    const resp:IPayload = jwtDecode(response.data.token);
    const user = resp.userId;
    let type: string = '';
    const respUser = await api.get<IType>(`/startup/${user}`);
    if (respUser.data.startup) {
      type = 'startup';
    } else if(respUser.data.investor) {
      type = 'investor';
    } else if(respUser.data.client) {
      type = 'cliente';
    } else {
      const respUser = await api.get<IType>(`/admin/${user}`);
      return {
        token: response.data.token,
        user: respUser.data,
        type: 'admin',
      };
    }
    return {
      token: response.data.token,
      user: respUser.data,
      type
    };
  }
}

// Função chamada pelo contexto de autenticação para fazer o cadastro.
export async function signUp({
  path,
  data
}: ISignUp): Promise<IResponseSignUp | undefined> {
  const response = await api.post(path, {...data, phone: '0'});

  if (response.status.toString().startsWith('2')) {
    const user = response.data.id;
    let type: string = '';
    const respUser = await api.get<IType>(`/startup/${user}`);
    if (respUser.data.startup) {
      type = 'startup';
    } else if(respUser.data.investor) {
      type = 'investor';
    } else if(respUser.data.client) {
      type = 'cliente';
    } else {
      const respUser = await api.get<IType>(`/admin/${user}`);
      return {
        token: response.data.token,
        user: respUser.data,
        type: 'admin',
        completed: false
      };
    }
    return {
      token: response.data.token,
      user: respUser.data,
      type,
      completed: false
    };
  }
}