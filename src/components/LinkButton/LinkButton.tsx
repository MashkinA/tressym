import cl from './LinkButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  isValidationCorrent: boolean;
  children: React.ReactNode;
  path: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({isValidationCorrent, children, path} ) => {

    
    return (
        <Link className={isValidationCorrent ? cl.linkBtn : cl.linkBtnDisabled} to={path}>
            {children}
        </Link>
    );
};

export default LinkButton;