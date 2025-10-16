import cl from '../styles/StartPage.module.css';
import cla from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { useState } from "react";
import { TressymHeader } from "../components/TressymHeader/TressymHeader.tsx";
import axios from "axios";

const backImage = "./assets/background/sleepyDragon.webp";

export const StartPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);


    async function fetchPage () {
        const response = await axios.get("http://localhost:3001/startPage");
        console.log(response.data);
        setIsFetchLoading(false);
    }

    fetchPage();
    
    /*
    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/startPage");
                setNamePage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);
     */

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