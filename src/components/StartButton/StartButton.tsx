import React from "react";
import cl from './StartButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  children: React.ReactNode;
  path: string;
};

const StartButton = ({children, path}: LinkButtonProps ) => {

    
    return (
        <Link className={cl.linkBtn} to={path}>
            {children}
        </Link>
    );
};

export default StartButton;