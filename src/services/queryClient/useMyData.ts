/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query"
import { IUser } from "../../models/IUser";
import api from "../api";

interface IType extends IUser {
  client: Object | null;
  startup: Object | null;
  investor: Object | null;
}

export interface IResponse {
  user: IUser;
  type: string;
}

export async function getMyData(type: string, id: string): Promise<IResponse> {
  const pathType = type === 'investidor' ? 'investor' : type === 'cliente' ? 'client' : type === 'startup' ? 'startup' : `admin`;
  const respUser = await api.get<IType>(`/${pathType}`);
  return {
    user: respUser.data,
    type
  };
}

export function useMyData() {
  if(typeof window !== 'undefined') {
    const type = localStorage.getItem('@agroi9:type');
    const user = localStorage.getItem('@agroi9:user');
    return useQuery(['me'], () => getMyData(type?.replaceAll('"', '') as string, user?.replaceAll('"', '') as string), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
  } else {
    return useQuery(['me'], () => getMyData('', ''), {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }
}