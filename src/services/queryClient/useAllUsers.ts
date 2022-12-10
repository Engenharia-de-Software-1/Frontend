import { useQuery } from "@tanstack/react-query"
import { IIdea } from "../../models/IIdea";
import api from "../api";

export async function getUsers(): Promise<any[]> {
  const { data } = await api.get('/user');
  
  return data;
}

export function useAllUsers() {
  return useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
}