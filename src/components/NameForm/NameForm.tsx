import React, { useState } from 'react';
import cl from './NameForm.module.css';

type NameFormProps = {
    onChange: (value: string) => void;
    inputHint: string;
    placeholder: string;
};

export const NameForm = ({onChange, inputHint, placeholder}: NameFormProps) => {

    const [name, setName] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        onChange(e.target.value);
    }


    return (
        <div className={cl.nameForm}>
            <input
                className={cl.nameInput}
                value={name}
                onChange={handleInputChange}
                type="text"
                placeholder={placeholder}
            />

            <h6 className={cl.nameHint}>{inputHint}</h6>
        </div>
    );
};