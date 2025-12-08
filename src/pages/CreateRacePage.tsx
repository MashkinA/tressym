import { useEffect, useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectRace from '../components/SelectRace/SelectRace.tsx';
import type { SpeciesPageType } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import axios from "axios";

export const CreateRacePage = () => {

    const [selectedId, setSelectedId] = useState<number>(1);
    const [racePage, setRacePage] = useState<SpeciesPageType | null>(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const selectedSubId = useAppSelector((state) => state.userReducer.subRaceId);

    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/raceSelection");
                setRacePage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsPageLoading(false);
            }
        }

        fetchPage();
    }, []);

    const userInput = {
        race: selectedId,
        subRace: selectedSubId
    };

    if (isPageLoading || !racePage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages currentPage={racePage.body.header.title} />

            <SelectRace
                itemList={racePage.mainInfo.components}
                onSelectId={setSelectedId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/name'}
                nextPage={'/character/creation/class'}
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};
