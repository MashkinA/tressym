import cl from './NavBar.module.css';
import LinkButton from '../LinkButton/LinkButton';

type NavBarProps = {
    isValidationCorrect: boolean;
    prevPage: string;
    nextPage: string;
}

export const NavBar = ({isValidationCorrect, prevPage, nextPage}:NavBarProps) => {
    return (
        <div className={cl.navbar}>
            <LinkButton path={prevPage} isValidationCorrect={true}>
                Назад
            </LinkButton>

            <LinkButton path={'/'} isValidationCorrect={true}>
                В ангар
            </LinkButton>

            <LinkButton path={nextPage} isValidationCorrect={isValidationCorrect}>
                Далее
            </LinkButton>
        </div>
    );
};