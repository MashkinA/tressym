import cl from "../../styles/Pages.module.css";
import StartButton from "../StartButton/StartButton.tsx";
import { Link } from "react-router-dom";
const tressym = "/assets/icons/tressym.webp";



export const TressymHeader = () => {
    return (
        <header className={cl.tressymHeader}>
            <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
            <h1>Tressym</h1>
            <Link className={cl.linkBtn} to="/character/creation/name"> Книга игрока </Link>
            <Link className={cl.linkBtn} to="/character/creation/name"> Сюжеты </Link>
            <Link className={cl.linkBtn} to="/character/creation/name"> О нас </Link>
            <StartButton path={"/character/creation/name"}> Создать персонажа </StartButton>
        </header>
    );
};