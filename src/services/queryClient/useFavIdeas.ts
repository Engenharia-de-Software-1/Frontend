import { useQuery } from "@tanstack/react-query"
import { IIdea } from "../../models/IIdea";
import api from "../api";

export async function getFavIdeas(): Promise<IIdea[]> {
    const { data } = await api.get('/idea/favorite');
    return data;
}

export function useFavIdeas() {
    return useQuery(['favideas'], () => getFavIdeas(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}