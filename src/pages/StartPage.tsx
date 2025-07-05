import LinkButton from '../components/LinkButton/LinkButton';
import cl from '../styles/StartPage.module.css';
import { startingPageMock } from '../mocks/StartingPageMock';

const StartPage = () => {
    
    const response = startingPageMock; // замена ручки

    function parsePath(str: string, char: string) {
        const index = str.indexOf(char);
        return str.slice(index + char.length);
    }
    

    const linkTitle = response.body.mainInfo.components[0].title;
    const linkPath = parsePath(response.body.mainInfo.components[0].actions[0].href, "/tressym");
    const backImage = "./assets/background/sleepyDragon.webp";
    

    
    
    return (
        <div className={cl.wrapper}>
            <LinkButton path={ linkPath } isValidationCorrent={true}> { linkTitle } </LinkButton>
            <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />
        </div>
    );
};

export default StartPage;