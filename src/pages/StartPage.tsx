import cl from '../styles/StartPage.module.css';
import cla from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { useState } from "react";
import { TressymHeader } from "../components/TressymHeader/TressymHeader.tsx";

const backImage = "./assets/background/sleepyDragon.webp";

export const StartPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch();

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <main className={cla.pageWrapper}>
                    <TressymHeader />
                    <img className={cl.img} src={ backImage }  alt="Приключенец сидит на спящем драконе" />

                    <div className={cl.startSlogan}>
                        <h2 className={cl.startPageH2}>D&D это просто</h2>
                        <h3 className={cl.startPageH3}>С помощью этого сайта вы сможете поэтапно  создать персонажа для игры в Dungeons & Dragons. Ваш герой — это сочетание игровых характеристик, элементов ролевого отыгрыша и вашего воображения!</h3>
                    </div>
                </main>
            }
        </div>
    );
};