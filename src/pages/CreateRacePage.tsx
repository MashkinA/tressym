import { useEffect, useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectRace from '../components/SelectRace/SelectRace.tsx';
import type { Race } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import api from "../api/axios.ts";
import {userSlice} from "../store/reducers/UserSlice.ts";

export const CreateRacePage = () => {

    const [selectedId, setSelectedId] = useState<number>(1);
    const [racePage, setRacePage] = useState<Race[] | null>(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const selectedSubId = useAppSelector((state) => state.userReducer.subRaceId);
    const { setRace } = userSlice.actions
    const dispatch = useAppDispatch()
    const handleSend = UseHandleSend();



    useEffect(() => {
        async function fetchPage() {
            try {
                const res = await api.get('/creation/races/list', { withCredentials: true });
                setRacePage(res.data);
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

    const submitRace = ()=> {
        dispatch(setRace(selectedId));
        handleSend(userInput);
    }

    if (isPageLoading || !racePage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages currentPage={'Раса'} />

            <SelectRace
                itemList={racePage}
                onSelectId={setSelectedId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/name'}
                nextPage={'/character/creation/class'}
                onNextClick={() => submitRace()}
            />
        </div>
    );
};
