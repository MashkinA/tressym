import {useCallback, useState} from 'react';
import { Loader } from "../components/Loader/Loader.tsx";
import cl from "../styles/Pages.module.css";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import { SkillsPageMock } from "../mocks/SkillsPageMock.ts";
import { NavBar } from "../components/NavBar/NavBar.tsx";
import SelectSkills from "../components/SelectSkill/SelectSkills.tsx";

type UserInput = {
    selectedSkills: string[];
}

export const CreateSkillsPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const [userInput, setUserInput] = useState<UserInput>({ selectedSkills: [] });

    // Стабильный колбэк — ссылка не меняется, пока не изменится setUserInput (стабильна)
    const handleTrackSkills = useCallback((skillsArray: string[]) => {
        setUserInput(prev => ({ ...prev, selectedSkills: skillsArray }));
    }, [setUserInput]);

    return (
        <div>
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <TressymHeaderPages
                        currentPage={SkillsPageMock.body.header.title}
                    />

                    <SelectSkills
                        skills={SkillsPageMock.mainInfo.components}
                        onTrackSkills={handleTrackSkills}
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/characteristics'}
                        nextPage={'/character/creation/character-sheet'}
                    />

                    <div onClick={() => {console.log(userInput)}}></div>

                </div>
            }
        </div>
    );
};
