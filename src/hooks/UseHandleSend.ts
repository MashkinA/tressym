import api from "../api/axios.ts"
import { UseAuthCheck } from "./UseAuthCheck.ts";

type Payload = Record<string, any>;

export function UseHandleSend() {
    const { user, setUser } = UseAuthCheck();

    const handleSend = async (payload: Payload) => {
        if (!user) {
            console.warn('User not authenticated');
            return;
        }

        try {
            const res = await api.patch(
                '/auth/update',
                payload,
                { withCredentials: true }
            );

            if (res.data?.user) {
                setUser(res.data.user);
            }
        } catch (error: any) {
            console.error("Ошибка при отправке данных:", error?.response?.data ?? error);
        }
    };

    return handleSend;
}
