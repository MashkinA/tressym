import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import SelectBack from "../components/SelectBack/SelectBack.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";
import type { Background } from "../components/types.ts";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import {userSlice} from "../store/reducers/UserSlice.ts";
import {useAppDispatch} from "../hooks/redux.ts";

export const CreateBackgroundPage = () => {


    const [isPageLoading, setIsPageLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [backPage, setBackPage] = useState<Background[] | null>(null);
    const { setBackground } = userSlice.actions
    const dispatch = useAppDispatch()
    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const res = await axios.get("http://localhost:5000/creation/backgrounds/list", { withCredentials: true });
                setBackPage(res.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsPageLoading(false);
            }
        }

        fetchPage();
    }, []);

    const userInput = {
        background: selectedId
    };

    const submitBackground = ()=> {
        dispatch(setBackground(selectedId));
        handleSend(userInput);
    }

    if (isPageLoading || !backPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={'Происхождение'}
            />
            <SelectBack
                itemList={backPage}
                onSelectId={setSelectedId}
            />
            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/class'}
                nextPage={'/character/creation/characteristics'}
                onNextClick={() => submitBackground()}
            />
        </div>
    );
};