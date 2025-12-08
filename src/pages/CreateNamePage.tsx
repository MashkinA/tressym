import { useEffect, useState } from 'react';
import { NameForm } from '../components/NameForm/NameForm';
import { NavBar } from '../components/NavBar/NavBar';
import { Loader } from '../components/Loader/Loader';
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import type { NamePageType } from "../components/types.ts";
import cl from '../styles/Pages.module.css';
import axios from "axios";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";

export const CreateNamePage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [NamePage, setNamePage] = useState<NamePageType | null>(null);
    const [validStatus, setValidStatus] = useState(false);
    const [name, setName] = useState<string>('');

    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/nameSelection");
                setNamePage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsPageLoading(false);
            }
        }
        fetchPage();
    }, []);

    const validationCheck = (value: string) => {
        setName(value);
        setValidStatus(!(value.length < 2 || value.length > 64));
    };

    const userInput = {
        name: name
    };

    if (isPageLoading || !NamePage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages currentPage={NamePage.body.header.title} />

            <NameForm
                onChange={validationCheck}
                inputHint={NamePage.mainInfo.components[0].description}
                placeholder="Придумайте имя вашего персонажа"
            />

            <NavBar
                isValidationCorrect={validStatus}
                prevPage="/"
                nextPage="/character/creation/race"
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};
