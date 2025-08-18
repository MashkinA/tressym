import cl from "./SelectSubRace.module.css";
import type { SubRace } from "../types.ts";
import { useState, forwardRef, useImperativeHandle } from "react";
import {userSlice} from "../../store/reducers/UserSlice.ts";
import {useAppDispatch} from "../../hooks/redux.ts";

export type SelectSubItemProps = {
    subItemsList: SubRace[];
    onCreate: (value: number) => void;
};

export type SelectSubRaceHandle = {
    resetSubId: () => void;
};

const cornerImg = "/assets/icons/corner.webp";

export const SelectSubRace = forwardRef<SelectSubRaceHandle, SelectSubItemProps>(
    ({ subItemsList, onCreate }, ref) => {

        const { setRace } = userSlice.actions
        const dispatch = useAppDispatch()

        // начальное значение выбранной подрасы
    const [currentSubItem, setCurrentSubItem] = useState(0);

        // функция смены подрасы при клике по ее названию
    const handleSwitchSubRace = (index: number, id: number) => {
        setCurrentSubItem(index);
        onCreate(id);
        dispatch(setRace(index))
    }

        // функция сброса индекса подрасы при переключении между рассами (вызывается при смене расы)
    useImperativeHandle(ref, () => ({
        resetSubId() {
            setCurrentSubItem(0);
        }
    }));

    return (
        <div className={cl.subItem}>
            <img className={cl.subItemCorner1} src={ cornerImg } alt=""/>
            <img className={cl.subItemCorner2} src={ cornerImg } alt=""/>
            <img className={cl.subItemCorner3} src={ cornerImg } alt=""/>
            <img className={cl.subItemCorner4} src={ cornerImg } alt=""/>

            {/** Уровень заголовков подрасс */}
            <div className={cl.subItemTitle}>
                {subItemsList.map((char, index) => (
                    <h2 className={index === currentSubItem ? cl.subItemTitleValueActive : cl.subItemTitleValue}
                        key={char.subRaceId}
                        onClick={() => handleSwitchSubRace(index, char.subRaceId)}>
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
                    <span className={cl.subItemCharsValue} key={char.title}>{char.title} +{char.value}</span>
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