import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Class } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { ClassesPageMock } from "../mocks/ClassesPageMock.ts";
import SelectClass from "../components/SelectClass/SelectClass.tsx";
import {Loader} from "../components/Loader/Loader.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";

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
                    <TressymHeaderPages
                        currentPage={ClassesPageMock.body.header.title}
                    />

                    <SelectClass
                        itemList={classes}
                        onSelectId={setSelectedId}
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/race'}
                        nextPage={'/character/creation/background'}
                    />

                    <div onClick={() => {console.log(userInput)}}></div>
                </div>
            }
        </div>
    );
};