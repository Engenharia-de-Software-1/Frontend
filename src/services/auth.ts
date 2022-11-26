import { IUser } from '../models/IUser';
import api from './api';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import { ICadastro } from '../pages/cadastro';
import { set } from '../contexts/store';

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
  user: string;
  type: string;
}

// Interface usada para decodificar o payload do token.
interface IPayload extends JwtPayload {
  userId: string;
  userType: string;
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
    password
  });

  
  if (response.status.toString().startsWith('2')) {
    const resp:IPayload = jwtDecode(response.data.token);
    let type: string = resp.userType === 'startup' ? 'startup' : resp.userType === 'cliente' ? 'client' : resp.userType === 'investidor' ? 'investor' : `admin`;
    let respUser = await api.get<IType>(`${type}`, {
      headers: {
        authorization: `Bearer ${response.data.token}`,
      }
    });

    return {
      token: response.data.token,
      user: respUser.data.id,
      type: resp.userType,
    };
  }
}

// Função chamada pelo contexto de autenticação para fazer o cadastro.
export async function signUp({
  path,
  data
}: ISignUp): Promise<IResponseSignIn | undefined> {
  const response = await api.post(path, {...data, phone: '0', profession: '_' });

  if (response.status.toString().startsWith('2')) {
    const login = await signIn(data);
    return login;
  }
}