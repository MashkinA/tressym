import cl from './LinkButton.module.css';
import { Link } from 'react-router-dom';

type LinkButtonProps = {
  validationStatus: boolean;
  children: React.ReactNode;
  path: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({validationStatus, children, path} ) => {

    const isActive = (boolStatus: boolean) => {
        if (boolStatus) {
            return cl.linkBtn
        } else {
            return cl.linkBtn_disabled
        }
    }
    
    return (
        <Link className={isActive(validationStatus)} to={path}>
            {children}
        </Link>
    );
};

export default LinkButton;