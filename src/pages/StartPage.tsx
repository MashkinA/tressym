import cl from '../styles/StartPage.module.css';
import cla from "../styles/Pages.module.css";
import { startingPageMock } from '../mocks/StartingPageMock';
import { Loader } from "../components/Loader/Loader.tsx";
import { useState } from "react";
import StartButton from "../components/StartButton/StartButton.tsx";

const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";

export const StartPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch();

    const response = startingPageMock; // замена ручки

    const linkTitle = response.body.mainInfo.components[0].title;
    const linkPath = "/character/creation/name";
    const backImage = "./assets/background/sleepyDragon.webp";

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cla.pageWrapper}>
                    <div className={cla.pageCreateHeader}>
                        <img className={cla.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        <img className={cla.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                        <img className={cla.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </div>
                    <StartButton path={ linkPath } isValidationCorrect={true}> { linkTitle } </StartButton>
                    <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />
                </div>
            }
        </div>
    );
};