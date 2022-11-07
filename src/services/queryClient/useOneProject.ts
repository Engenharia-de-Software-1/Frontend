import { useQuery } from "@tanstack/react-query"
import { IProject } from "../../models/IProject";
import api from "../api";

export async function getProject(id: string): Promise<IProject> {
    const { data } = await api.get('/project/' + id);
    return data;
}

export function useOneProject(id: string) {
    return useQuery(['project', id], () => getProject(id), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}