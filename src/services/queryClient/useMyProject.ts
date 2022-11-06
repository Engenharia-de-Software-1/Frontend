import { useQuery } from "@tanstack/react-query"
import { IProject } from "../../models/IProject";
import api from "../api";

export async function getMyProjects(userId: string): Promise<IProject[]> {
    const { data } = await api.get('/project/user/' + userId);
    return data;
}

export function useMyProjects(userId: string) {
    return useQuery(['myprojects'], () => getMyProjects(userId), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}