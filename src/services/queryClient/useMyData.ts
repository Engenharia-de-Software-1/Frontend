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

export async function getMyData(user: string): Promise<IResponse> {
  let type: string = '';
  const respUser = await api.get<IType>(`/startup/${user}`);
  if (respUser.data.startup) {
    type = 'startup';
  } else if(respUser.data.investor) {
    type = 'investidor';
  } else if(respUser.data.client) {
    type = 'cliente';
  } else {
    const respUser = await api.get<IType>(`/admin/${user}`);
    return {
      user: respUser.data,
      type: 'admin',
    };
  }
  return {
    user: respUser.data,
    type
  };
}

export function useMyData() {
  if(typeof window !== 'undefined') {
    const user = localStorage.getItem('@agroi9:user');
    return useQuery(['me'], () => getMyData(user?.replaceAll('"', '') as string), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
  } else {
    return useQuery(['me'], () => getMyData(''), {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }
}