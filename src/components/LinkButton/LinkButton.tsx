import React from "react";
import cl from './LinkButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  isValidationCorrect: boolean;
  children: React.ReactNode;
  path: string;
  onNextClick?: () => void;
};

const LinkButton = ({isValidationCorrect, children, path, onNextClick}: LinkButtonProps ) => {

    return (
        <Link className={isValidationCorrect ? cl.linkBtn : cl.linkBtnDis} to={path} onClick={(e) => {
            if (!isValidationCorrect) {
                e.preventDefault();
                return;
            }
            onNextClick?.();
        }}>
            {children}
        </Link>
    );
};

export default LinkButton;