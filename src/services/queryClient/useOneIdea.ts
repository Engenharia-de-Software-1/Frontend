import { useQuery } from "@tanstack/react-query"
import { IIdea } from "../../models/IIdea";
import api from "../api";

export async function getIdea(id: string): Promise<IIdea> {
    const { data } = await api.get('/idea/' + id);
    return data;
}

export function useOneIdea(id: string) {
    return useQuery(['idea', id], () => getIdea(id), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}