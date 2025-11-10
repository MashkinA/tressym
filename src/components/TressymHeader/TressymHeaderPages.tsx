import cl from "../../styles/Pages.module.css";
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
                <h6 className={currentPage === pages[0] ? cl.headerPageCurrent : cl.headerPage}>{ pages[0] }</h6>
                <h6 className={currentPage === pages[1] ? cl.headerPageCurrent : cl.headerPage}>{ pages[1] }</h6>
                <h6 className={currentPage === pages[2] ? cl.headerPageCurrent : cl.headerPage}>{ pages[2] }</h6>
                <h6 className={currentPage === pages[3] ? cl.headerPageCurrent : cl.headerPage}>{ pages[3] }</h6>
                <h6 className={currentPage === pages[4] ? cl.headerPageCurrent : cl.headerPage}>{ pages[4] }</h6>
                <h6 className={currentPage === pages[5] ? cl.headerPageCurrent : cl.headerPage}>{ pages[5] }</h6>
            </div>
        </header>
    );
};