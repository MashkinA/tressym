import React from "react";
import cl from './LinkButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  isValidationCorrect: boolean;
  children: React.ReactNode;
  path: string;
};

const LinkButton = ({isValidationCorrect, children, path}: LinkButtonProps ) => {

    
    return (
        <Link className={isValidationCorrect ? cl.linkBtn : cl.linkBtnDis} to={path}>
            {children}
        </Link>
    );
};

export default LinkButton;