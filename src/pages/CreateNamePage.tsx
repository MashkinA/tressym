import { useEffect, useState } from 'react';
import { NameForm } from '../components/NameForm/NameForm';
import { NavBar } from '../components/NavBar/NavBar';
import { Loader } from '../components/Loader/Loader';
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import type { NamePageType } from "../components/types.ts";
import cl from '../styles/Pages.module.css';
import axios from "axios";

export const CreateNamePage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [NamePage, setNamePage] = useState<NamePageType | null>(null);
    const [validStatus, setValidStatus] = useState(false);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/nameSelection");
                setNamePage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);

    const validationCheck = (name: string) => {
        setName(name);
        setValidStatus(!(name.length < 2 || name.length > 64));
    };

    const userInput = {
        "name": name
    }

    const handleSend = async () => {
        try {
            await axios.patch("http://localhost:3001/users/1", {
                name: userInput.name
            });
            console.log("✅ Данные успешно отправлены:", userInput.name);
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    if (isFetchLoading || !NamePage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={NamePage.body.header.title}
            />
            <NameForm
                onChange={validationCheck}
                inputHint={NamePage.mainInfo.components[0].description}
                placeholder="Придумайте имя вашего персонажа"
            />
            <NavBar
                isValidationCorrect={validStatus}
                prevPage="/"
                nextPage="/character/creation/race"
                onNextClick={handleSend}
            />
        </div>
    );
};
