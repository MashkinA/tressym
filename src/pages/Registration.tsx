import React, { useState } from 'react';
import api from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseAuthCheck } from '../hooks/UseAuthCheck.ts';
import cl from "../styles/Pages.module.css";
const tressym = "/assets/icons/tressym.webp";

export const Registration = () => {

    const { setUser } = UseAuthCheck();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, password }, { withCredentials: true });
            await api.get('/auth/check', { withCredentials: true }).then(r => setUser(r.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при регистрации');
        }
    };

    return (
        <main className={cl.pageWrapper}>
            <header className={cl.tressymHeader}>
                <div className={cl.tressymHeaderLeft}>
                    <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                    <h1>Tressym</h1>
                </div>
                <div className={cl.tressymHeaderReg}>
                    <h1>Регистрация</h1>
                </div>
            </header>

            <form onSubmit={handleSubmit} className={cl.loginForm}>
                <input className={cl.loginInput} type="text" placeholder="Придумайте логин" value={username} onChange={e => setUsername(e.target.value)} />
                <input className={cl.loginInput} type="password" placeholder="Придумайте пароль" value={password} onChange={e => setPassword(e.target.value)} />
                <button className={cl.loginBtn} type="submit">Зарегистрироваться</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </main>
    );
};