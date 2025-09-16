import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Background } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import {BackgroundPageMock} from "../mocks/BackgroundPageMock.ts";
import SelectBack from "../components/SelectBack/SelectBack.tsx";

const tracery = "/assets/icons/tracery.webp";

export const CreateBackgroundPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const backgrounds: Background[] = BackgroundPageMock.mainInfo.components;

    const [selectedId, setSelectedId] = useState<number>(1);

    const userInput = {
        "backgroundId": selectedId
    }

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <header className={cl.pageCreateHeader} onClick={() => console.log(userInput)}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        {BackgroundPageMock.body.header.title}
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </header>
                    <SelectBack
                        itemList={backgrounds}
                        onSelectId={setSelectedId}
                    />
                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/class'}
                        nextPage={'/character/creation/characteristics'}
                    />

                </div>
            }
        </div>
    );
};