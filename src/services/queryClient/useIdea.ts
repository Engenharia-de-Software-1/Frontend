import { useQuery } from "@tanstack/react-query"
import { IIdea } from "../../models/IIdea";
import api from "../api";

export async function getIdeas(): Promise<IIdea[]> {
    const { data } = await api.get('/idea');
    
    return data;
}

export function useIdeas() {
    return useQuery(['ideas'], () => getIdeas(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}