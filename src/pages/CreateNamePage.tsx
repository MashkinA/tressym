import { useState } from 'react';
import { NameForm } from '../components/NameForm/NameForm';
import { NavBar } from '../components/NavBar/NavBar';
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import cl from '../styles/Pages.module.css';
import { UseHandleSend } from "../hooks/UseHandleSend.ts";

export const CreateNamePage = () => {

    const [validStatus, setValidStatus] = useState(false);
    const [name, setName] = useState<string>('');

    const handleSend = UseHandleSend();

    const validationCheck = (value: string) => {
        setName(value);
        setValidStatus(!(value.length < 2 || value.length > 64));
    };

    const userInput = {
        name: name
    };

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages currentPage={'Имя'} />

            <NameForm
                onChange={validationCheck}
                inputHint={'* Имя вашего персонажа зависит от расы, класса, мировоззрения и предыстории персонажа, а также от его предыстории. Помните, самое короткое имя в Фаэруне принадлежало колдунье - Ио'}
                placeholder="Придумайте имя вашего персонажа"
            />

            <NavBar
                isValidationCorrect={validStatus}
                prevPage="/"
                nextPage="/character/creation/race"
                onNextClick={() => handleSend(userInput)}
            />
        </div>
    );
};
