import {useCallback, useEffect, useState} from 'react';
import { Loader } from "../components/Loader/Loader.tsx";
import cl from "../styles/Pages.module.css";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import type { SkillPageType } from "../components/types.ts"
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
    const [skillPage, setSkillPage] = useState<SkillPageType | null>(null);

    const handleSend = UseHandleSend();
2
    useEffect(() => {
        setValidStatus(userInput.skill.length === skillPage?.mainInfo.components.amount);
    }, [userInput]);

    useEffect(() => {
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/skillsSelection");
                setSkillPage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
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
                currentPage={skillPage.body.header.title}
            />

            <SelectSkills
                skills={skillPage.mainInfo.components}
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
