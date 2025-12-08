import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { CharPageType } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import SelectChars from "../components/SelectChars/SelectChars.tsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import axios from "axios";

type UserInput = {
    strengthValue: number;
    dexterityValue: number;
    constitutionValue: number;
    intelligenceValue: number;
    wisdomValue: number;
    charismaValue: number;
}

export const CreateCharsPage = () => {

    const [validStatus, setValidStatus] = useState(true)
    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [charPage, setCharPage] = useState<CharPageType | null>(null);
    const [charValue, setCharValue] = useState<UserInput>({
        strengthValue: 15,
        dexterityValue: 14,
        constitutionValue: 13,
        intelligenceValue: 12,
        wisdomValue: 10,
        charismaValue: 8,
    });

    const handleSend = UseHandleSend();

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/characteristicSelection");
                setCharPage(response.data);

                const components = response.data.mainInfo.components;

                setCharValue({
                    strengthValue: components[0]?.strengthRecommendValue ?? 15,
                    dexterityValue: components[1]?.dexterityRecommendValue ?? 14,
                    constitutionValue: components[2]?.constitutionRecommendValue ?? 13,
                    intelligenceValue: components[3]?.intelligenceRecommendValue ?? 12,
                    wisdomValue: components[4]?.wisdomRecommendValue ?? 10,
                    charismaValue: components[5]?.charismaRecommendValue ?? 8,
                });
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
    }, []);

    const userInput = {
        characteristic: {
            strength: charValue.strengthValue,
            dexterity: charValue.dexterityValue,
            constitution: charValue.constitutionValue,
            intelligence: charValue.intelligenceValue,
            wisdom: charValue.wisdomValue,
            charisma: charValue.charismaValue
        }
    };

    if (isFetchLoading || !charPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={charPage.body.header.title}
            />
            <SelectChars
                characteristics={charPage.mainInfo.components}
                onTrackChars={setCharValue}
                onValidationCheck={setValidStatus}
            />
            <NavBar
                isValidationCorrect={validStatus}
                prevPage={'/character/creation/background'}
                nextPage={'/character/creation/skills'}
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};