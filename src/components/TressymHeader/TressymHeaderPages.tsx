import cl from "../../styles/Pages.module.css";
import {Link} from "react-router-dom";
const tressym = "/assets/icons/tressym.webp";

type TressymHeaderPagesProps = {
    currentPage: string;
}

const pages = ["Имя", "Раса", "Класс", "Происхождение", "Способности", "Навыки"]

export const TressymHeaderPages = ({ currentPage }: TressymHeaderPagesProps) => {
    return (
        <header className={cl.tressymHeaderPages}>
            <div className={cl.tressymHeaderLeft}>
                <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                <h1>Tressym</h1>
            </div>

            <div className={cl.tressymHeaderRight}>
                <Link to={'/character/creation/name'} className={currentPage === pages[0] ? cl.headerPageCurrent : cl.headerPage}>{ pages[0] }</Link>
                <Link to={'/character/creation/race'} className={currentPage === pages[1] ? cl.headerPageCurrent : cl.headerPage}>{ pages[1] }</Link>
                <Link to={'/character/creation/class'} className={currentPage === pages[2] ? cl.headerPageCurrent : cl.headerPage}>{ pages[2] }</Link>
                <Link to={'/character/creation/background'} className={currentPage === pages[3] ? cl.headerPageCurrent : cl.headerPage}>{ pages[3] }</Link>
                <Link to={'/character/creation/characteristics'} className={currentPage === pages[4] ? cl.headerPageCurrent : cl.headerPage}>{ pages[4] }</Link>
                <Link to={'/character/creation/skills'} className={currentPage === pages[5] ? cl.headerPageCurrent : cl.headerPage}>{ pages[5] }</Link>
            </div>
        </header>
    );
};