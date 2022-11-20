import { useQuery } from "@tanstack/react-query"
import { IIdea } from "../../models/IIdea";
import api from "../api";

export async function getMyIdeas(userId: string): Promise<IIdea[]> {
    const { data } = await api.get('/idea/user/' + userId);
    return data;
}

export function useMyIdeas(userId: string) {
    return useQuery(['myideas'], () => getMyIdeas(userId), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}