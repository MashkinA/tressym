import cl from '../styles/StartPage.module.css';
import cla from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { TressymHeader } from "../components/TressymHeader/TressymHeader.tsx";
import { UseAuthCheck } from "../hooks/UseAuthCheck.ts";
import api from "../api/axios.ts";

const backImage = "./assets/background/sleepyDragon.webp";
const tressym = "/assets/icons/tressym.webp";

export const StartPage = () => {

    const { user, isFetchLoading, setUser } = UseAuthCheck();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout', {}, { withCredentials: true });
            setUser(null);
            window.location.href = '/';
        } catch (e) {
            console.error('Ошибка выхода', e);
        }
    };

    if (isFetchLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className={cla.mobileWarning} role="dialog" aria-live="polite" aria-label="Мобильное предупреждение">
                <div className={cla.mobileWarningInner}>
                    <img className={cla.tressymImg} src="/assets/icons/tressym.webp" alt="" />
                    <h2 className={cla.mobileWarningText}>Мобильная версия сайта находится в разработке</h2>
                </div>
            </div>

            <main className={cla.pageWrapper}>
                <TressymHeader
                    auth = {!!user}
                />
                <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />

                <div className={cl.startSlogan}>
                    <h2 className={cl.startPageH2}>D&D это просто</h2>
                    <h3 className={cl.startPageH3}>С помощью этого сайта вы сможете поэтапно  создать персонажа для игры в Dungeons & Dragons. Ваш герой — это сочетание игровых характеристик, элементов ролевого отыгрыша и вашего воображения!</h3>
                </div>

                {
                    user ? (
                        <div className={cl.user}>
                            <img className={cl.userImg} src={ tressym }  alt="Трессум" />
                            <span>{user.username}</span>
                            <button className={cl.logout} onClick={handleLogout}>Выйти</button>
                        </div>
                    ) : <span></span>
                }
            </main>
        </>
    );
};