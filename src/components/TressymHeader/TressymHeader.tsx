import cl from "../../styles/Pages.module.css";

const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";

export const TressymHeader = () => {
    return (
        <header className={cl.pageCreateHeader}>
            <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
            <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
            <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
        </header>
    );
};