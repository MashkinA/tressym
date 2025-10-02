import cl from "./BackDescription.module.css";
import type { Background } from "../types.ts";

export type BackDescriptionProps = {
    selectedBack: Background;
};

const borderline = "/assets/icons/borderLine.webp";

export const BackDescription = ({ selectedBack }: BackDescriptionProps) => {

    return (
        <section className={cl.background}>
            <img className={cl.subItemTopLine} src={ borderline } alt=""/>
            <img className={cl.subItemBottomLine} src={ borderline } alt=""/>

            <div className={cl.backgroundGrid}>
                <div className={cl.backgroundGrid_left}>
                    {/** Уровень описания подрассы */}
                    <h2 className={cl.backgroundDescription}>{selectedBack.description}</h2>
                    {/** Уровень описания способности */}
                    <span className={cl.backgroundSkills}>
                        <span className={cl.backgroundSkillsTitle}>Уникальный навык: </span>
                        <span className={cl.backgroundDescription}>{selectedBack.description}</span>
                    </span>
                </div>

                <div className={cl.backgroundGrid_right}>
                    {/** Уровень описания навыков */}
                    <span className={cl.backgroundSkills}>
                        <span className={cl.backgroundSkillsTitle}>Владение навыками: </span>

                        {selectedBack.attainments.map((char, index) => (
                            <span className={cl.backgroundSkillsValue} key={char}>
                                {char}{index === selectedBack.attainments.length - 1 ? '.' : ', '}
                            </span>
                        ))}
                    </span>
                    {/** Уровень описания инструментов */}
                    <span className={cl.backgroundSkills}>
                        <span className={cl.backgroundSkillsTitle}>Владение инструментами: </span>

                        {selectedBack.instruments.map((char, index) => (
                            <span className={cl.backgroundSkillsValue} key={char}>
                                {char}{index === selectedBack.instruments.length - 1 ? '.' : ', '}
                            </span>
                        ))}
                    </span>
                    {/** Уровень описания снаряжения */}
                    <span className={cl.backgroundSkills}>
                        <span className={cl.backgroundSkillsTitle}>Снаряжения: </span>

                        {selectedBack.equipment.map((char, index) => (
                            <span className={cl.backgroundSkillsValue} key={char}>
                                {char}{index === selectedBack.equipment.length - 1 ? '.' : ', '}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </section>
    )};