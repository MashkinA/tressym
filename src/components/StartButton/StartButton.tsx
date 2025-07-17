import React from "react";
import cl from './StartButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  isValidationCorrect: boolean;
  children: React.ReactNode;
  path: string;
};

const StartButton = ({isValidationCorrect, children, path}: LinkButtonProps ) => {

    
    return (
        <Link className={isValidationCorrect ? cl.linkBtn : cl.linkBtnDisabled} to={path}>
            {children}
        </Link>
    );
};

export default StartButton;