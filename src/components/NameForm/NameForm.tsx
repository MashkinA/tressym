import React, { useState } from 'react';
import cl from './NameForm.module.css';

type NameFormProps = {
    onChange: (value: string) => void;
};

export const NameForm = ({onChange}: NameFormProps) => {

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

            <h6 className={cl.nameHint}>Имя персонажа должно соответствовать его расе и происхождению, а также отражать его характер и предысторию</h6>
        </div>
    );
};