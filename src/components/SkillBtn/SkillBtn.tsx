import React, {useEffect, useState} from 'react';
import cl from "./SkillBtn.module.css";

type SkillBtnProps = {
    toggle?: boolean;
    block?: boolean;
}

export const SkillBtn = ({toggle = false, block = false}: SkillBtnProps) => {

    const [togg, setTogg] = useState(toggle);

    useEffect(() => {
        setTogg(toggle);
    }, [toggle]);

    const handleClick = (e: React.MouseEvent) => {
        if (block) {
            e.preventDefault();
            return;
        }
        setTogg(prev => !prev);
    };

    return (
        <button className={togg ? cl.featureBtnOff : cl.featureBtnOn}
                onClick = {handleClick}/>
    );
};