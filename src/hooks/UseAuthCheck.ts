import { useEffect, useState } from 'react';
import axios from 'axios';

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
            const res = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
            console.log('auth check response:', res.data)
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