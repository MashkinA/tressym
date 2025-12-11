import {useCallback, useEffect, useState} from 'react';
import { Loader } from "../components/Loader/Loader.tsx";
import cl from "../styles/Pages.module.css";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import type { Skills } from "../components/types.ts"
import { NavBar } from "../components/NavBar/NavBar.tsx";
import SelectSkills from "../components/SelectSkill/SelectSkills.tsx";
import axios from "axios";
import { UseHandleSend } from "../hooks/UseHandleSend.ts";

type UserInputType = {
    skill: string[];
}

export const CreateSkillsPage = () => {

    const [validStatus, setValidStatus] = useState(false)
    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [userInput, setUserInput] = useState<UserInputType>({ skill: [] });
    const [skillPage, setSkillPage] = useState<Skills | null>(null);
    const handleSend = UseHandleSend();

    useEffect(() => {
        setValidStatus(userInput.skill.length === skillPage?.amount);
    }, [userInput]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPage() {
            try {
                const userRes = await axios.get(`http://localhost:5000/auth/check`, {
                    withCredentials: true,
                    signal: controller.signal
                });
                const recommendedClassId = (userRes.data.user.class);

                if (recommendedClassId > 0) {
                    const res = await axios.get(`http://localhost:5000/creation/skills/${recommendedClassId}`, {
                        withCredentials: true,
                        signal: controller.signal
                    });
                    setSkillPage(res.data);
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


    const handleTrackSkills = useCallback((skillsArray: string[]) => {
        setUserInput(prev => ({ ...prev, skill: skillsArray }));
    }, [setUserInput]);

    if (isFetchLoading || !skillPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={'Навыки'}
            />

            <SelectSkills
                skills={skillPage}
                onTrackSkills={handleTrackSkills}
            />

            <NavBar
                isValidationCorrect={validStatus}
                prevPage={'/character/creation/characteristics'}
                nextPage={'/character/creation/character-sheet'}
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};
