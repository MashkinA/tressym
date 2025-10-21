import cl from './NavBar.module.css';
import LinkButton from '../LinkButton/LinkButton';

type NavBarProps = {
    isValidationCorrect: boolean;
    prevPage: string;
    nextPage: string;
    onNextClick?: () => void;
}

export const NavBar = ({isValidationCorrect, prevPage, nextPage, onNextClick}:NavBarProps) => {
    return (
        <nav className={cl.navbar}>
            <LinkButton path={prevPage} isValidationCorrect={true}>
                Назад
            </LinkButton>

            <LinkButton path={'/character/creation/character-sheet'} isValidationCorrect={true}>
                К листу
            </LinkButton>

            <LinkButton path={nextPage} isValidationCorrect={isValidationCorrect} onNextClick={onNextClick}>
                Далее
            </LinkButton>
        </nav>
    );
};