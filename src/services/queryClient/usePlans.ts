import { useQuery } from "@tanstack/react-query"
import { IPlan } from "../../models/IPlan";
import api from "../api";

export async function getPlans(): Promise<IPlan[]> {
    const { data } = await api.get('/plans');
    return data;
}

export function usePlans() {
    return useQuery(['plans'], () => getPlans(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}