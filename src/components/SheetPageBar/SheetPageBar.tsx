import cl from '../NavBar/NavBar.module.css';
import cla from '../LinkButton/LinkButton.module.css';
import LinkButton from '../LinkButton/LinkButton';

type NavBarProps = {
    prevPage: string;
    onDownloadPdf?: () => void;
}

export const SheetPageBar = ({prevPage, onDownloadPdf}:NavBarProps) => {
    return (
        <nav className={cl.navbar}>
            <LinkButton path={prevPage} isValidationCorrect={true}>
                Назад
            </LinkButton>

            <LinkButton path={'/'} isValidationCorrect={true}>
                На главную
            </LinkButton>

            <button className={cla.linkBtn} onClick={onDownloadPdf}>
                Скачать
            </button>
        </nav>
    );
};