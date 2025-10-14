import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectRace from '../components/SelectRace/SelectRace.tsx';
import type { Race } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { SpeciesPageMock } from "../mocks/SpeciesPageMock.ts";
import { Loader } from "../components/Loader/Loader.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";

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
    const selectedSubId = useAppSelector((state) => state.userReducer.subRaceId);

    const userInput = {
        "raceId": selectedId,
        "subRaceId": selectedSubId,
    }

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <TressymHeaderPages
                        currentPage={SpeciesPageMock.body.header.title}
                    />
                    <SelectRace
                        itemList={species}
                        onSelectId={setSelectedId}
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/name'}
                        nextPage={'/character/creation/class'}
                    />
                    <div onClick={() => {console.log(userInput)}}></div>
                </div>
            }
        </div>
    );
};