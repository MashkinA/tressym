import cl from "./SelectSubItem.module.css";
import type { SubComp } from "../types.ts";
import { useState, forwardRef, useImperativeHandle } from "react";

export type SelectSubItemProps = {
    subItemsList: SubComp[];
    onCreate: (value: number) => void;
};

export type SelectSubItemHandle = {
    resetSubId: () => void;
};

export const SelectSubItem = forwardRef<SelectSubItemHandle, SelectSubItemProps>(
    ({ subItemsList, onCreate }, ref) => {


        // начальное значение выбранной подрасы
    const [currentSubItem, setCurrentSubItem] = useState(0);

        // функция смены подрасы при клике по ее названию
    const handleSwitchSubRace = (id: number) => {
        setCurrentSubItem(id - 1);
        onCreate(id);
    }

        // функция сброса индекса подрасы при переключении между рассами (вызывается при смене расы)
    useImperativeHandle(ref, () => ({
        resetSubId() {
            setCurrentSubItem(0);
            onCreate(1);
        }
    }));

    return (
        <div className={cl.subItem}>

            {/** Уровень заголовков подрасс */}
            <div className={cl.subItemTitle}>
                {subItemsList.map((char) => (
                    <h2 className={char.subRaceId === (currentSubItem + 1) ? cl.subItemTitleValueActive : cl.subItemTitleValue} key={char.subRaceId} onClick={() => handleSwitchSubRace(char.subRaceId)}>
                        {char.title}
                    </h2>
                ))}
            </div>

            {/** Уровень описания подрассы */}
            <h2 className={cl.subItemDescription}>{subItemsList[currentSubItem].description}</h2>

            {/** Уровень строки увеличения характеристик */}
            <span className={cl.subItemChars}>
                <span className={cl.subItemCharsTitle}>Увеличение характеристик:</span>

                {subItemsList[currentSubItem].chars.map((char) => (
                    <span className={cl.subItemCharsValue} key={char.title}>{char.title}  +{char.value}</span>
                ))}
            </span>

            {/** Уровень строки способностей подрассы */}
            {subItemsList[currentSubItem].abilities.map((char) => (
                <div className={cl.subItemAbilities} key={char.title}>
                    <span className={cl.subItemAbilitiesTitle}>{char.title}. </span>
                    <span className={cl.subItemAbilitiesDescription}>{char.description}</span>
                </div>
            ))}

        </div>
    );
});