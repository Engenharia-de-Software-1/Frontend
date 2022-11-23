import { useQuery } from "@tanstack/react-query"
import { IPlan } from "../../models/IPlan";
import api from "../api";

export async function getPlans(): Promise<IPlan[]> {
    // const { data } = await api.get('/plans');
    //return data;
    let data = [
        {
            id: '0',
            name: 'Basic',
            permissions: 'read',
            value: 8000,
        },
        {
            id: '1',
            name: 'Plus',
            permissions: 'read, invest',
            value: 10000,
        },
        {
            id: '2',
            name: 'Premium',
            permissions: 'read, invest, anything else idk',
            value: 12000,
        }
    ]
    return data;
}

export function usePlans() {
    return useQuery(['plans'], () => getPlans(), {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}