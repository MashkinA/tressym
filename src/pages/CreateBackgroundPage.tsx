import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import SelectBack from "../components/SelectBack/SelectBack.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import axios from "axios";
import type { BackPageType } from "../components/types.ts";

export const CreateBackgroundPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [backPage, setBackPage] = useState<BackPageType | null>(null);

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/backgroundSelection");
                setBackPage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);



    const userInput = {
        "backgroundId": selectedId
    }

    const handleSend = async () => {
        try {
            await axios.patch("http://localhost:3001/users/1", {
                background: userInput.backgroundId
            });
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    if (isFetchLoading || !backPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={backPage.body.header.title}
            />
            <SelectBack
                itemList={backPage.mainInfo.components}
                onSelectId={setSelectedId}
            />
            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/class'}
                nextPage={'/character/creation/characteristics'}
                onNextClick={handleSend}
            />

            <div onClick={() => {console.log(userInput)}}></div>

        </div>
    );
};