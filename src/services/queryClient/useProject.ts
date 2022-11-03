import { useQuery } from "@tanstack/react-query"
import { IProject } from "../../models/IProject";
import api from "../api";

export async function getProjects(): Promise<IProject[]> {
    const { data } = await api.get('/project');
    return data;
}

export function useProjects() {
    return useQuery(['projects'], () => getProjects(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}