import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Background } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import {BackgroundPageMock} from "../mocks/BackgroundPageMock.ts";
import SelectBack from "../components/SelectBack/SelectBack.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";

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
                <div className={cl.pageWrapper} onClick={() => console.log(userInput)}>
                    <TressymHeaderPages
                        currentPage={BackgroundPageMock.body.header.title}
                    />
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