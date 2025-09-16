import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Char } from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { CharsPageMock } from "../mocks/CharsPageMock.ts";
import SelectChars from "../components/SelectChars/SelectChars.tsx";

const tracery = "/assets/icons/tracery.webp";

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

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const chars: Char[] = CharsPageMock.mainInfo.components;

    const [userInput, setUserInput] = useState<UserInput>({
        "strengthValue": chars[0].strengthRecommendValue ?? 15,
        "dexterityValue": chars[1].dexterityRecommendValue ?? 14,
        "constitutionValue": chars[2].constitutionRecommendValue ?? 13,
        "intelligenceValue": chars[3].wisdomRecommendValue ?? 12,
        "wisdomValue": chars[4].intelligenceRecommendValue ?? 10,
        "charismaValue": chars[5].charismaRecommendValue ?? 8
    });

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <header className={cl.pageCreateHeader} onClick={() => console.log(userInput)}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        {CharsPageMock.body.header.title}
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </header>
                    <SelectChars
                        characteristics={chars}
                        onTrackChars={setUserInput}
                        onValidationCheck={setValidStatus}
                    />
                    <NavBar
                        isValidationCorrect={validStatus}
                        prevPage={'/character/creation/background'}
                        nextPage={'/character/creation/start'}
                    />
                </div>
            }
        </div>
    );
};