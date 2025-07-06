import LinkButton from '../components/LinkButton/LinkButton';
import cl from '../styles/StartPage.module.css';
import { startingPageMock } from '../mocks/StartingPageMock';

export const StartPage = () => {
    
    const response = startingPageMock; // замена ручки

    

    const linkTitle = response.body.mainInfo.components[0].title;
    const linkPath = "/character/creation/name";
    const backImage = "./assets/background/sleepyDragon.webp";
    

    
    
    return (
        <div className={cl.wrapper}>
            <LinkButton path={ linkPath } isValidationCorrect={true}> { linkTitle } </LinkButton>
            <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />
        </div>
    );
};