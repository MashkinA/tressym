import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import cl from "../styles/Pages.module.css";
import SelectClass from "../components/SelectClass/SelectClass.tsx";
import {Loader} from "../components/Loader/Loader.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";
import type { ClassesPageType } from "../components/types.ts";

export const CreateClassPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [classPage, setClassPage] = useState<ClassesPageType | null>(null);

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/classSelection");
                setClassPage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);



    const userInput = {
        "classId": selectedId,
    }

    const handleSend = async () => {
        try {
            await axios.patch("http://localhost:3001/users/1", {
                class: userInput.classId
            });
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    if (isFetchLoading || !classPage) {
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
                onNextClick={handleSend}
            />

            <div onClick={() => {console.log(userInput)}}></div>
        </div>
    );
};