import React, { useState } from 'react';
import cl from './NameForm.module.css';

type NameFormProps = {
    create: (value: string) => void;
};

export const NameForm: React.FC<NameFormProps> = ({create}) => {

    const [name, setName] = useState('');

    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        create(e.target.value);
    }


    return (
        <div className={cl.nameForm}>
            <h1 className={cl.title}>Придумайте имя вашего персонажа</h1>
            <input
                className={cl.nameInput}
                value={name}
                onChange={validateInput}
                type="text"
                placeholder=""
            />

            <h6 className={cl.nameHint}>Имя персонажа должно соответствовать его расе и происхождению, а также отражать его характер и предысторию</h6>
        </div>
    );
};