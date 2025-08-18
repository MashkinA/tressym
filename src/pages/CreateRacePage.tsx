import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectRace from '../components/SelectRace/SelectRace.tsx';
import type { Race } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { SpeciesPageMock } from "../mocks/SpeciesPageMock.ts";
import { Loader } from "../components/Loader/Loader.tsx";
import { useAppSelector } from "../hooks/redux.ts";

const tracery = "/assets/icons/tracery.webp";

export const CreateRacePage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const species: Race[] = SpeciesPageMock.mainInfo.components;

    const [selectedId, setSelectedId] = useState<number>(1);
    const [selectedSubId, setSelectedSubId] = useState<number>(1);

    const userInput = {
        "raceId": selectedId,
        "subRaceId": selectedSubId,
    }

    const test = useAppSelector((state) => state.userReducer.subRaceId);

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <div className={cl.pageCreateHeader} onClick={() => console.log(userInput, test)}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        {SpeciesPageMock.body.header.title}
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </div>
                    <SelectRace
                        itemList={species}
                        onSelectId={setSelectedId}
                        onSelectSubId={setSelectedSubId}
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/name'}
                        nextPage={'/character/creation/class'}
                    />

                </div>
            }
        </div>
    );
};