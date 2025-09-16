import cl from '../styles/StartPage.module.css';
import cla from "../styles/Pages.module.css";
import { startingPageMock } from '../mocks/StartingPageMock';
import { Loader } from "../components/Loader/Loader.tsx";
import { useState } from "react";
import StartButton from "../components/StartButton/StartButton.tsx";
import {TressymHeader} from "../components/TressymHeader/TressymHeader.tsx";

const backImage = "./assets/background/sleepyDragon.webp";

export const StartPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch();

    const linkTitle = startingPageMock.body.mainInfo.components[0].title;

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <main className={cla.pageWrapper}>
                    <TressymHeader />
                    <StartButton path={ "/character/creation/name" }> { linkTitle } </StartButton>
                    <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />
                </main>
            }
        </div>
    );
};