import React, { useState } from 'react';
import api from "../api/axios.ts";
import { useNavigate } from 'react-router-dom';
import { UseAuthCheck } from '../hooks/UseAuthCheck.ts';
import cl from "../styles/Pages.module.css";
import { Link } from "react-router-dom";
const tressym = "/assets/icons/tressym.webp";

export const Login = () => {
    const { setUser } = UseAuthCheck();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/login', { username, password }, { withCredentials: true });
            await api.get('/auth/check', { withCredentials: true }).then(r => setUser(r.data.user));
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при входе');
        }
    };

    return (
        <main className={cl.pageWrapper}>
            <header className={cl.tressymHeader}>
                <Link className={cl.tressymHeaderLeft} to="/">
                    <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                    <h1>Tressym</h1>
                </Link>
                <div className={cl.tressymHeaderReg}>
                    <h1>Вход</h1>
                </div>
            </header>

            <form onSubmit={handleSubmit} className={cl.loginForm}>
                <input className={cl.loginInput} type="text" placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} />
                <input className={cl.loginInput} type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
                <button className={cl.loginBtn} type="submit">Войти</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </main>
    );
};