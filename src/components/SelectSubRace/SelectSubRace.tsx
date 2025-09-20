import cl from "./SelectSubRace.module.css";
import type { SubRace } from "../types.ts";
import { useState, forwardRef, useImperativeHandle } from "react";
import { userSlice } from "../../store/reducers/UserSlice.ts";
import { useAppDispatch } from "../../hooks/redux.ts";

const cornerImg = "/assets/icons/corner.webp";

export type SelectSubItemProps = {
    subItemsList: SubRace[];
};

export type SelectSubRaceHandle = {
    resetSubId: () => void;
};

export const SelectSubRace = forwardRef<SelectSubRaceHandle, SelectSubItemProps>(
    ({ subItemsList }, ref) => {

    const { setSubRace } = userSlice.actions
    const dispatch = useAppDispatch()

        // начальное значение выбранной подрасы
    const [currentSubItem, setCurrentSubItem] = useState(0);

        // функция смены подрасы при клике по ее названию
    const handleSwitchSubRace = (index: number, id: number) => {
        setCurrentSubItem(index);
        dispatch(setSubRace(id))
    }

        // функция сброса индекса подрасы при переключении между рассами (вызывается при смене расы)
    useImperativeHandle(ref, () => ({
        resetSubId() {
            setCurrentSubItem(0);
        }
    }));

    return (
        <section className={cl.subItem}>
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

            <div className={cl.subItemDescriptionContainer}>
                <img className={cl.subItemCorner1} src={ cornerImg } alt=""/>
                <img className={cl.subItemCorner2} src={ cornerImg } alt=""/>
                <img className={cl.subItemCorner3} src={ cornerImg } alt=""/>
                <img className={cl.subItemCorner4} src={ cornerImg } alt=""/>

                {/** Уровень описания подрассы */}
                <h2 className={cl.subItemDescription}>{subItemsList[currentSubItem].description}</h2>

                {/** Уровень строки увеличения характеристик */}
                <div className={cl.subItemAbilities}>
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
            </div>
        </section>
    );
    });