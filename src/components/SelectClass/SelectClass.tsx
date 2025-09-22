import type { Class } from "../types.ts";
import { useState } from "react";
import { ClassSelector } from "../ClassSelector/ClassSelector.tsx";
import cl from '../ClassSelector/ClassSelector.module.css';

const cornerImg = "/assets/icons/corner.webp";

type SelectListProps = {
    onSelectId: (value: number) => void;
    itemList: Class[];
}

const SelectRace = ({ itemList, onSelectId }: SelectListProps) => {

    // Начальное значение списка полученных классов
    const [currentId, setCurrentId] = useState<number>(0);

    // Переключение рассы колбеком (необходимо для currentSubItem)
    const selectId = (id: number) => {
        setCurrentId((id - 1) % itemList.length);
        onSelectId(id);
    }

    return (
        <div>
            <ClassSelector
                itemList={itemList}
                onCreate={selectId}
            />

            <section className={cl.class}>

                    <img className={cl.subItemCorner1} src={ cornerImg } alt=""/>
                    <img className={cl.subItemCorner2} src={ cornerImg } alt=""/>
                    <img className={cl.subItemCorner3} src={ cornerImg } alt=""/>
                    <img className={cl.subItemCorner4} src={ cornerImg } alt=""/>

                    {/** Колонка описания класса + ссылка */}
                    <div className={cl.classDescription}>
                        <h2 className={cl.classBaseText}>{itemList[currentId].description}</h2>
                        <span className={cl.classBaseText}>Хиты на первом уровне: {itemList[currentId].hits}</span>
                        <a className={cl.classBaseText} href={itemList[currentId].detailedInfo}>Подробная информация о данном классе</a>
                    </div>

                    {/** Колонка описания способностей класса */}
                    <div className={cl.classAbilities}>
                        {itemList[currentId].skills.map((skill) => (
                            <div className={cl.a} key={skill.title}>
                                <h3 className={cl.classTitleText}>• {skill.title} </h3>
                                {skill.description.map((description, index) => (
                                    <p className={cl.classBaseText} key={index}>{description}</p>
                                ))}
                            </div>
                        ))}
                    </div>

            </section>

        </div>
    );
};

export default SelectRace;

