import React from 'react';
import cl from './NavBar.module.css';
import LinkButton from '../LinkButton/LinkButton';

type NavBarProps = {
    isValidationCorrect: boolean;
    prevPage: string;
    nextPage: string;
}

export const NavBar: React.FC<NavBarProps> = ({isValidationCorrect, prevPage, nextPage}) => {
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