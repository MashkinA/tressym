import { useState } from 'react';
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

    const [userInput, setUserInput] = useState<UserInput>({
        "selectedSkills": []
    });

    return (
        <div>
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper} onClick={() => console.log(userInput)}>
                    <TressymHeaderPages
                        currentPage={SkillsPageMock.body.header.title}
                    />

                    <SelectSkills
                        skills={SkillsPageMock.mainInfo.components}
                        onTrackSkills={(skillsArray) =>
                            setUserInput((prev) => ({
                                ...prev,
                                selectedSkills: skillsArray,
                            }))
                        }
                    />

                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/characteristics'}
                        nextPage={'/character/creation/class'}
                    />
                </div>
            }
        </div>
    );
};
