import { useState } from 'react';
import { NameForm } from '../components/NameForm/NameForm';
import { NavBar } from '../components/NavBar/NavBar';
import { Loader } from '../components/Loader/Loader';
import cl from '../styles/Pages.module.css';
import {NamePageMock} from "../mocks/NamePageMock.ts";

const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";

export const CreateNamePage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 1000)
    }
    fakeFetch()



    const [validStatus, setValidStatus] = useState(false)

    const validationCheck = (name: string) => {
        setValidStatus(true)
        if (name.length < 2 || name.length > 64) {
            setValidStatus(false)
        }
    }



    return (
        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <div className={cl.pageCreateHeader}>
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                        <img className={cl.pageCreateHeaderTressym} src={ tressym }  alt="Трессум" />
                        <img className={cl.pageCreateHeaderTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    </div>
                    <NameForm
                        onChange={validationCheck}
                        inputHint={NamePageMock.mainInfo.components[0].description}
                        placeholder={NamePageMock.body.header.title}
                    />
                    <NavBar
                        isValidationCorrect={validStatus}
                        prevPage={'/'}
                        nextPage={'/character/creation/race'}
                    />
                </div>
            }
        </div>
    );
};