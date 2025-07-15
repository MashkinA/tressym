import { useState } from 'react';
import { NameForm } from '../components/NameForm/NameForm';
import { NavBar } from '../components/NavBar/NavBar';
import { Loader } from '../components/Loader/Loader';
import cl from '../styles/Pages.module.css';

export const CreateNamePage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);

    const fakeFetch = () => {
        setTimeout(() => {
            setIsFetchLoading(false)
        }, 2000)
    }




    const [validStatus, setValidStatus] = useState(false)


    const validationCheck = (name: string) => {
        setValidStatus(true)
        if (name.length < 2 || name.length > 64) {
            setValidStatus(false)
        }
    }

    fakeFetch()

    return (

        <div >
            {isFetchLoading
                ?
                <Loader />
                :
                <div className={cl.pageWrapper}>
                    <NameForm
                        onChange={validationCheck}
                    />
                    <NavBar
                        isValidationCorrect={validStatus}
                        prevPage={'/'}
                        nextPage={'/character/creation/species'}
                    />

                </div>

            }
        </div>

    );
};