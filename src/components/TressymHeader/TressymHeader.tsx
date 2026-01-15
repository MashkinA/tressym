import cl from "../../styles/Pages.module.css";
import StartButton from "../StartButton/StartButton.tsx";
import { Link } from "react-router-dom";
const tressym = "/assets/icons/tressym.webp";

type TressymHeaderProps = {
    auth: boolean;
}

export const TressymHeader = ({auth}: TressymHeaderProps) => {

    return (
        <header className={cl.tressymHeader}>
            <Link className={cl.tressymHeaderLeft} to="/">
                <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                <h1>Tressym</h1>
            </Link>
                {
                    auth ? (
                        <div className={cl.tressymHeaderRight}>
                            <Link className={cl.linkBtn} to="/character/creation/rolebook"> Книга игрока </Link>
                            <Link className={cl.linkBtn} to="/character/creation/story"> Сюжеты </Link>
                            <Link className={cl.linkBtn} to="/character/creation/about"> О нас </Link>
                            <StartButton path={"/character/creation/name"}> Создать персонажа </StartButton>
                        </div>
                    ) : (
                        <div className={cl.tressymHeaderRight}>
                            <Link className={cl.linkBtn} to="/character/creation/rolebook"> Книга игрока </Link>
                            <Link className={cl.linkBtn} to="/character/creation/story"> Сюжеты </Link>
                            <Link className={cl.linkBtn} to="/character/creation/about"> О нас </Link>
                            <StartButton path={"/login"}> Войти </StartButton>
                            <StartButton path={"/registration"}> Регистрация </StartButton>
                        </div>
                    )
                }
        </header>
    );
};
