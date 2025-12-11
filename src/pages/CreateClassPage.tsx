import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import cl from "../styles/Pages.module.css";
import SelectClass from "../components/SelectClass/SelectClass.tsx";
import {Loader} from "../components/Loader/Loader.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";
import type { Class } from "../components/types.ts";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import {userSlice} from "../store/reducers/UserSlice.ts";
import {useAppDispatch} from "../hooks/redux.ts";

export const CreateClassPage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [classPage, setClassPage] = useState<Class[] | null>(null);
    const { setClass } = userSlice.actions
    const dispatch = useAppDispatch()
    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const res = await axios.get("http://localhost:5000/creation/classes/list", { withCredentials: true });
                setClassPage(res.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsPageLoading(false);
            }
        }

        fetchPage();
    }, []);

    const userInput = {
        class: selectedId
    };

    const submitClass = ()=> {
        dispatch(setClass(selectedId));
        handleSend(userInput);
    }

    if (isPageLoading || !classPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={'Класс'}
            />

            <SelectClass
                itemList={classPage}
                onSelectId={setSelectedId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/race'}
                nextPage={'/character/creation/background'}
                onNextClick={() => submitClass()}
            />
        </div>
    );
};