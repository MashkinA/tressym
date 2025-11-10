import { useEffect, useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectRace from '../components/SelectRace/SelectRace.tsx';
import type { SpeciesPageType } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";

export const CreateRacePage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [racePage, setRacePage] = useState<SpeciesPageType | null>(null);


    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/raceSelection");
                setRacePage(response.data);

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);

    const selectedSubId = useAppSelector((state) => state.userReducer.subRaceId);

    const userInput = {
        "raceId": selectedId,
        "subRaceId": selectedSubId,
    }

    const handleSend = async () => {
        try {
            await axios.patch("http://localhost:3001/users/1", {
                race: userInput.raceId
            });
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    if (isFetchLoading || !racePage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={racePage.body.header.title}
            />
            <SelectRace
                itemList={racePage.mainInfo.components}
                onSelectId={setSelectedId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/name'}
                nextPage={'/character/creation/class'}
                onNextClick={handleSend}
            />
            <div onClick={() => {console.log(userInput)}}></div>
        </div>
    );
};