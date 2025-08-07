import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import type { Char} from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { Loader } from "../components/Loader/Loader.tsx";
import { CharsPageMock } from "../mocks/CharsPageMock.ts";
import SelectChars from "../components/SelectChars/SelectChars.tsx";

const tracery = "/assets/icons/tracery.webp";

export const CreateCharsPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()

    const chars: Char[] = CharsPageMock.mainInfo.components;

    const userInput = {
        "strengthValue": 16,
        "dexterityValue": 12,
        "constitutionValue": 16,
        "intelligenceValue": 10,
        "wisdomValue": 8,
        "charismaValue": 13
    }

    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <div className={cl.pageCreateHeader} onClick={() => console.log(userInput)}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        {CharsPageMock.body.header.title}
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </div>
                    <SelectChars
                        characteristics={chars}
                    />
                    <NavBar
                        isValidationCorrect={true}
                        prevPage={'/character/creation/background'}
                        nextPage={'/character/creation/start'}
                    />

                </div>
            }
        </div>
    );
};