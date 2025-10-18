import {useCallback, useEffect, useState} from 'react';
import { Loader } from "../components/Loader/Loader.tsx";
import cl from "../styles/Pages.module.css";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import type { SkillPageType } from "../components/types.ts"
import { NavBar } from "../components/NavBar/NavBar.tsx";
import SelectSkills from "../components/SelectSkill/SelectSkills.tsx";
import axios from "axios";

type UserInput = {
    selectedSkills: string[];
}

export const CreateSkillsPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [userInput, setUserInput] = useState<UserInput>({ selectedSkills: [] });
    const [skillPage, setSkillPage] = useState<SkillPageType | null>(null);


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
        setUserInput(prev => ({ ...prev, selectedSkills: skillsArray }));
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
                isValidationCorrect={true}
                prevPage={'/character/creation/characteristics'}
                nextPage={'/character/creation/character-sheet'}
            />

            <div onClick={() => {console.log(userInput)}}></div>

        </div>
    );
};
