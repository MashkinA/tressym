import React, { useState } from 'react';
import cl from './NameForm.module.css';

type NameFormProps = {
    onChange: (value: string) => void;
    inputHint: string;
};

export const NameForm = ({onChange, inputHint}: NameFormProps) => {

    const [name, setName] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        onChange(e.target.value);
    }


    return (
        <div className={cl.nameForm}>
            <h1 className={cl.title}>Придумайте имя вашего персонажа</h1>
            <input
                className={cl.nameInput}
                value={name}
                onChange={handleInputChange}
                type="text"
            />

            <h6 className={cl.nameHint}>{inputHint}</h6>
        </div>
    );
};