import { useEffect, useState } from 'react';
import api from "../api/axios.ts";

export type UserType = {
    id: string;
    username: string;
    roles: string[];
} | null;

export function UseAuthCheck() {
    const [user, setUser] = useState<UserType>(null);
    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await api.get('/auth/check', { withCredentials: true });
            setUser(res.data.user);
        } catch {
            setUser(null);
        } finally {
            setIsFetchLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { user, isFetchLoading, setUser, checkAuth };
}