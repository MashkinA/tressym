import {useEffect, useState} from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Characteristics } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import SelectChars from "../components/SelectChars/SelectChars.tsx";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";
import api from "../api/axios.ts";

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
    const [charPage, setCharPage] = useState<Characteristics | null>(null);
    const [charValue, setCharValue] = useState<UserInput>({
        strengthValue: 8,
        dexterityValue: 8,
        constitutionValue: 8,
        intelligenceValue: 8,
        wisdomValue: 8,
        charismaValue: 8,
    });

    const handleSend = UseHandleSend();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPage() {
            try {
                const userRes = await api.get(`/auth/check`, {
                    withCredentials: true,
                    signal: controller.signal
                });
                const recommendedClassId = (userRes.data.user.class);

                    if (recommendedClassId > 0) {
                        const res = await api.get(`/creation/characteristics/${recommendedClassId}`, {
                            withCredentials: true,
                            signal: controller.signal
                        });
                        setCharPage(res.data);

                        const components = res.data.characteristics;

                        setCharValue({
                            strengthValue: components[0]?.strengthRecommendValue ?? 8,
                            dexterityValue: components[1]?.dexterityRecommendValue ?? 8,
                            constitutionValue: components[2]?.constitutionRecommendValue ?? 8,
                            intelligenceValue: components[3]?.intelligenceRecommendValue ?? 8,
                            wisdomValue: components[4]?.wisdomRecommendValue ?? 8,
                            charismaValue: components[5]?.charismaRecommendValue ?? 8,
                        });
                    }
            } catch (error: any) {
                if (error.name === 'CanceledError' || error.message === 'canceled') {
                } else {
                    console.error('Ошибка загрузки данных:', error);
                }
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();

        return () => controller.abort();
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
                currentPage={'Способности'}
            />
            <SelectChars
                characteristics={charPage.characteristics}
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