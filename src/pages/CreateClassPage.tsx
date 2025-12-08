import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import cl from "../styles/Pages.module.css";
import SelectClass from "../components/SelectClass/SelectClass.tsx";
import {Loader} from "../components/Loader/Loader.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";
import type { ClassesPageType } from "../components/types.ts";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";

export const CreateClassPage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [classPage, setClassPage] = useState<ClassesPageType | null>(null);

    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/classSelection");
                setClassPage(response.data);
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

    if (isPageLoading || !classPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={classPage.body.header.title}
            />

            <SelectClass
                itemList={classPage.mainInfo.components}
                onSelectId={setSelectedId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/race'}
                nextPage={'/character/creation/background'}
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};