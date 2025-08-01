import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Class } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { ClassesPageMock } from "../mocks/ClassesPageMock.ts";
import SelectClass from "../components/SelectClass/SelectClass.tsx";
import {Loader} from "../components/Loader/Loader.tsx";

const tracery = "/assets/icons/tracery.webp";

export const CreateClassPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const classes: Class[] = ClassesPageMock.mainInfo.components;

    const [selectedId, setSelectedId] = useState<number>(1);

    const userInput = {
        "classId": selectedId,
    }

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <div className={cl.pageCreateHeader} onClick={() => console.log(userInput)}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        {ClassesPageMock.body.header.title}
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </div>

                    <SelectClass
                        itemList={classes}
                        onSelectId={setSelectedId}
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/race'}
                        nextPage={'/character/creation/background'}
                    />
                </div>
            }
        </div>
    );
};