import cl from "../styles/CharacterSheetPage.module.css";
import clsx from "clsx";
import {TressymHeaderPages} from "../components/TressymHeader/TressymHeaderPages.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import api from "../api/axios.ts";
import {Loader} from "../components/Loader/Loader.tsx";
import type {Background, Class, SubRace, UserType} from "../components/types.ts";
import {SheetPageBar} from "../components/SheetPageBar/SheetPageBar.tsx";
import {SkillBtn} from "../components/SkillBtn/SkillBtn.tsx";


const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";
const nameBorder = "/assets/icons/nameBorder.webp";
const lvlBorder = "/assets/icons/lvlBorder.webp";
const armorBorder = "/assets/icons/armorBorder.webp";
const hitsBorder = "/assets/icons/hitsBorder.webp";
const proficiency = "/assets/icons/proficiency.webp";
const strengthBorder = "/assets/icons/strengthBorder.webp";
const dexterityBorder = "/assets/icons/dexterityBorder.webp";
const constitutionBorder = "/assets/icons/constitutionBorder.webp";
const exhaustionBorder = "/assets/icons/exhaustionBorder.webp";
const inspirationBorder = "/assets/icons/inspirationBorder.webp";
const intNwisBorder = "/assets/icons/int&wisBorder.webp";
const charismaBorder = "/assets/icons/charismaBorder.webp";
const characteristicBorder = "/assets/icons/characteristicBorder.webp";
const excharacteristicBorder = "/assets/icons/excharacteristicBorder.webp";
const weaponBorder = "/assets/icons/weaponBorder.webp";
const classBorder = "/assets/icons/classBorder.webp";
const featsBorder = "/assets/icons/featsBorder.webp";
const equipmentBorder = "/assets/icons/equipmentBorder.webp";
const spellcastingBorder = "/assets/icons/spellcastingBorder.webp";
const spellslotsBorder = "/assets/icons/spellslotsBorder.webp";
const appearanceBorder = "/assets/icons/appearanceBorder.webp";
const personalityBorder = "/assets/icons/personalityBorder.webp";
const languagesBorder = "/assets/icons/languagesBorder.webp";
const sequipmentBorder = "/assets/icons/sequipmentBorder.webp";
const cantripsBorder = "/assets/icons/cantripsBorder.webp";

export const CharacterSheetPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [sheetPage, setSheetPage] = useState<UserType | null>(null);
    const [race, setRace] = useState<SubRace | null>(null);
    const [classs, setclasss] = useState<Class | null>(null);
    const [background, setBackground] = useState<Background | null>(null); // пофиксить начисление плюсов перкам от предыстории сейчас этого нихуя нет

    const strength = sheetPage?.characteristic?.strength ?? 0;
    const dexterity = sheetPage?.characteristic?.dexterity ?? 0;
    const constitution = sheetPage?.characteristic?.constitution ?? 0;
    const intelligence = sheetPage?.characteristic?.intelligence ?? 0;
    const wisdom = sheetPage?.characteristic?.wisdom ?? 0;
    const charisma = sheetPage?.characteristic?.charisma ?? 0;

    const handleDownloadPdf = () => {
        window.print();
    }

    const modifier = (count: number): string => {
        const value = Math.floor((count - 10) / 2);
        return value > 0 ? `+${value}` : `${value}`;
    };

    const skillCalculation = (count: number, skill: string): string => {
        if (sheetPage?.skill.includes(skill)) {
            const value = Math.floor((count - 10) / 2);
            const upValue = value + 2;
            return upValue > 0 ? `+${upValue}` : `${upValue}`;
        } else {
            return modifier(count)
        }
    };

    const saveCalculation = (count: number, char: string): string => {
        if (classs?.saveThrow.includes(char)) {
            const value = Math.floor((count - 10) / 2);
            const upValue = value + 2;
            return upValue > 0 ? `+${upValue}` : `${upValue}`;
        } else {
            return modifier(count)
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPage() {
            try {
                const userRes = await api.get(`/auth/check`, {
                    withCredentials: true,
                    signal: controller.signal
                });
                const raceId = (userRes.data.user.race);
                const subRaceId = (userRes.data.user.subRace);
                const classId = (userRes.data.user.class);
                const backgroundId = (userRes.data.user.background);

                setSheetPage(userRes.data.user);

                if (raceId > 0) {
                    const raceRes = await api.get(`/creation/races/${raceId}`, {
                        withCredentials: true,
                        signal: controller.signal,
                    });

                    const subRace = raceRes.data?.subcomponents?.find((sub: any) => sub.subRaceId === subRaceId);
                    if (subRace) setRace(subRace);
                }

                if (classId > 0) {
                    const classRes = await api.get(`/creation/classes/${classId}`, {
                        withCredentials: true,
                        signal: controller.signal,
                    });
                    if (classRes.data) setclasss(classRes.data);
                }
                if (backgroundId > 0) {
                    const backgroundRes = await api.get(`/creation/backgrounds/${backgroundId}`, {
                        withCredentials: true,
                        signal: controller.signal,
                    });
                    if (backgroundRes.data) setBackground(backgroundRes.data);
                }

            } catch (error: any) {
                if (!axios.isCancel(error)) {
                    console.error("Ошибка загрузки данных:", error);
                }
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();

        return () => controller.abort();
    }, []);



    if (isFetchLoading || !sheetPage) {
        return <Loader />;
    }

    return (
        <div className={cl.pageWrapper}>
            <TressymHeaderPages
                currentPage={""}
            />

            <div className={cl.charPage}>
                <div className={cl.sheetHeader}>
                    <div className={cl.name}>
                        <picture className={cl.border}>
                            <source srcSet={nameBorder} type="image/webp"/>
                            <img src={nameBorder} alt="Рамка блока имени"/>
                        </picture>

                        <label className={cl.name1row}>
                            <span className={cl.text}>{sheetPage?.name}</span>
                            <span className={cl.label}>Имя персонажа</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <span className={cl.text}>{background?.title}</span>
                            <span className={cl.label}>Просхождение</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <span className={cl.text}>{classs?.title}</span>
                            <span className={cl.label}>Класс</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <span className={cl.text}>{race?.title}</span>
                            <span className={cl.label}>Раса</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <span className={cl.text}> </span>
                            <span className={cl.label}>Подкласс</span>
                        </label>
                    </div>

                    <div className={cl.lvl}>
                        <picture className={cl.border}>
                            <source srcSet={lvlBorder} type="image/webp"/>
                            <img src={lvlBorder} alt="Рамка блока уровня"/>
                        </picture>
                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder="1"/>
                            <span className={cl.label}>Уровень</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text"/>
                            <span className={cl.label}>Опыт</span>
                        </label>
                    </div>

                    <div className={cl.armor}>
                        <picture className={cl.border}>
                            <source srcSet={armorBorder} type="image/webp"/>
                            <img src={armorBorder} alt="Рамка блока брони"/>
                        </picture>
                        <span className={cl.label}>Класс защиты</span>
                        <input className={cl.inputArmor}
                               type="text"
                               inputMode="numeric"
                               pattern="[0-9]*"
                               onChange={e => {
                                   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                               }}/>
                        <span className={cl.label}>Щит</span>
                        <SkillBtn/>
                    </div>

                    <div className={cl.hits}>
                        <picture className={cl.border}>
                            <source srcSet={hitsBorder} type="image/webp"/>
                            <img src={hitsBorder} alt="Рамка блока хитов"/>
                        </picture>
                        <div className={cl.hitPoints}>
                            <h5 className={cl.hitHeader}>ХИТЫ</h5>

                            <label className={cl.sheetLabel}>
                                <span
                                    className={cl.text}> {Number(classs?.hits.split('d')[1]) + Number(modifier(constitution))} </span>
                                <span className={cl.label}>Текущие</span>
                            </label>

                            <label className={cl.sheetLabel}>
                                <span className={cl.text}> 0 </span>
                                <span className={cl.label}>Временные</span>
                                <span
                                    className={cl.text}> {Number(classs?.hits.split('d')[1]) + Number(modifier(constitution))} </span>
                                <span className={cl.label}>Максимум</span>
                            </label>
                        </div>

                        <div className={cl.hitDice}>
                            <h5 className={cl.hitHeader}>КОСТИ ХИТОВ</h5>
                            <label className={cl.sheetLabel}>
                                <span className={cl.text}>1/1</span>
                                <span className={cl.label}>Текущие</span>
                                <span className={cl.text}>{classs?.hits}</span>
                                <span className={cl.label}>Кости</span>
                            </label>
                        </div>

                        <div className={cl.deathSaves}>
                            <h5 className={cl.hitHeader}>БРОСКИ</h5>
                            <label className={cl.sheetLabel}>
                                <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                <span className={cl.label}>Успехи</span>
                                <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                <span className={cl.label}>Провалы</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={cl.sheetLogo}>
                    <img className={cl.logoTracery} src={tracery} alt="Ажурный узор в шапке страницы"/>
                    <img className={cl.logoTressym} src={tressym} alt="Трессум"/>
                    <img className={cl.logoTracery} src={tracery} alt="Ажурный узор в шапке страницы"/>
                </div>

                <div className={cl.sheetMain}>
                    <div className={cl.mainStats}>
                        <div className={cl.abilities}>
                            <div className={cl.abilitiesColumn}>
                                <section className={cl.proficiency}>
                                    <picture className={cl.border}>
                                        <source srcSet={proficiency} type="image/webp"/>
                                        <img src={proficiency} alt="Рамка блока вдохновения"/>
                                    </picture>
                                    <h5 className={cl.abilitiesH}>Вдохновение</h5>
                                    <span className={cl.value}>+2</span>
                                </section>

                                <section className={clsx(cl.strength, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={strengthBorder} type="image/webp"/>
                                        <img src={strengthBorder} alt="Рамка блока силы"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Сила</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(strength)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{strength}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Сила")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(strength, "Сила")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Атлетика")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(strength, "Атлетика")}</span>
                                            <span className={cl.featureName}>Атлетика</span>
                                        </div>
                                    </div>
                                </section>

                                <section className={clsx(cl.dexterity, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={dexterityBorder} type="image/webp"/>
                                        <img src={dexterityBorder} alt="Рамка блока ловкости"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Ловкость</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(dexterity)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{dexterity}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Ловкость")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(dexterity, "Ловкость")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Акробатика")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(dexterity, "Акробатика")}</span>
                                            <span className={cl.featureName}>Акробатика</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Ловкость рук")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(dexterity, "Ловкость рук")}</span>
                                            <span className={cl.featureName}>Ловкость рук</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Скрытность")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(dexterity, "Скрытность")}</span>
                                            <span className={cl.featureName}>Скрытность</span>
                                        </div>
                                    </div>
                                </section>

                                <section className={clsx(cl.constitution, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={constitutionBorder} type="image/webp"/>
                                        <img src={constitutionBorder} alt="Рамка блока выносливости"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Телосложение</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(constitution)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{constitution}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Телосложение")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(constitution, "Телосложение")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                    </div>
                                </section>

                                <section className={clsx(cl.exhaustion, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={exhaustionBorder} type="image/webp"/>
                                        <img src={exhaustionBorder} alt="Рамка блока истощения"/>
                                    </picture>
                                    <h5 className={cl.abilitiesH}>Истощение</h5>
                                    <div className={cl.exhaustionBar}>
                                        <SkillBtn/>
                                        <SkillBtn/>
                                        <SkillBtn/>
                                        <SkillBtn/>
                                        <SkillBtn/>
                                        <SkillBtn/>
                                    </div>
                                </section>

                                <section className={clsx(cl.inspiration, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={inspirationBorder} type="image/webp"/>
                                        <img src={inspirationBorder} alt="Рамка блока вдохновения"/>
                                    </picture>
                                    <h5 className={cl.abilitiesH}>Героическое вдохновение</h5>
                                    <SkillBtn/>
                                </section>
                            </div>

                            <div className={cl.abilitiesColumn}>
                                <section className={clsx(cl.intelligence, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={intNwisBorder} type="image/webp"/>
                                        <img src={intNwisBorder} alt="Рамка блока интеллекта"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Интеллект</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(intelligence)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{intelligence}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Интеллект")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(intelligence, "Интеллект")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Анализ")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(intelligence, "Анализ")}</span>
                                            <span className={cl.featureName}>Анализ</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("История")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(intelligence, "История")}</span>
                                            <span className={cl.featureName}>История</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Магия")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(intelligence, "Магия")}</span>
                                            <span className={cl.featureName}>Магия</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Природа")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(intelligence, "Природа")}</span>
                                            <span className={cl.featureName}>Природа</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Религия")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(intelligence, "Религия")}</span>
                                            <span className={cl.featureName}>Религия</span>
                                        </div>
                                    </div>
                                </section>

                                <section className={clsx(cl.wisdom, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={intNwisBorder} type="image/webp"/>
                                        <img src={intNwisBorder} alt="Рамка блока мудрости"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Мудрость</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(wisdom)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{wisdom}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Мудрость")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(wisdom, "Мудрость")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Восприятие")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(wisdom, "Восприятие")}</span>
                                            <span className={cl.featureName}>Восприятие</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Выживание")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(wisdom, "Выживание")}</span>
                                            <span className={cl.featureName}>Выживание</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Медицина")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(wisdom, "Медицина")}</span>
                                            <span className={cl.featureName}>Медицина</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Проницательность")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(wisdom, "Проницательность")}</span>
                                            <span className={cl.featureName}>Проницательность</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Уход за животными")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(wisdom, "Уход за животными")}</span>
                                            <span className={cl.featureName}>Уход за животными</span>
                                        </div>
                                    </div>
                                </section>

                                <section className={clsx(cl.charisma, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={charismaBorder} type="image/webp"/>
                                        <img src={charismaBorder} alt="Рамка блока харизмы"/>
                                    </picture>

                                    <h5 className={cl.abilitiesH}>Харизма</h5>

                                    <div className={cl.AbilityModifier}>
                                        <div className={cl.modifierLabel}>
                                            <span className={cl.modifier}>{modifier(charisma)}</span>
                                            <span className={cl.abilityLabel}>Модификатор</span>
                                        </div>

                                        <div className={cl.valueLabel}>
                                            <span className={cl.value}>{charisma}</span>
                                            <span className={cl.abilityLabel}>Значение</span>
                                        </div>
                                    </div>

                                    <div className={cl.abilitiesList}>
                                        <div className={clsx(cl.feature, cl.featureFirst)}>
                                            <SkillBtn toggle={classs?.saveThrow.includes("Харизма")} block={true}/>
                                            <span className={cl.featureValue}>{saveCalculation(charisma, "Харизма")}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Выступление")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(charisma, "Выступление")}</span>
                                            <span className={cl.featureName}>Выступление</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Запугивание")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(charisma, "Запугивание")}</span>
                                            <span className={cl.featureName}>Запугивание</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Обман")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(charisma, "Обман")}</span>
                                            <span className={cl.featureName}>Обман</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <SkillBtn toggle={sheetPage?.skill.includes("Убеждение")} block={true}/>
                                            <span className={cl.featureValue}>{skillCalculation(charisma, "Убеждение")}</span>
                                            <span className={cl.featureName}>Убеждение</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <section className={cl.equipment}>
                            <picture className={cl.border}>
                                <source srcSet={equipmentBorder} type="image/webp"/>
                                <img src={equipmentBorder} alt="Рамка блока снаряжения"/>
                            </picture>
                            <h5 className={cl.abilitiesH}>Владение снаряжением и умения</h5>

                            <div className={cl.equipmentHeader}>
                                <span className={cl.featureName}>Владение доспехами</span>
                                <span className={cl.equipmentHeaderList}>
                                    <SkillBtn/>
                                    <span className={cl.featureName}>Легкая</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <SkillBtn/>
                                    <span className={cl.featureName}>Средняя</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <SkillBtn/>
                                    <span className={cl.featureName}>Тяжелая</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <SkillBtn/>
                                    <span className={cl.featureName}>Щиты</span>
                                </span>
                            </div>

                            <h5 className={cl.equipmentName}>Оружие</h5>
                            <textarea className={cl.featsInput} maxLength={625}/>
                            <h5 className={cl.equipmentName}>Инструменты</h5>
                            <textarea className={cl.featsInput} maxLength={625}/>
                        </section>
                    </div>
                    <div className={cl.mainFeatures}>
                        <div className={cl.characteristic}>
                            <section className={cl.charBlock}>
                                <picture className={cl.border}>
                                    <source srcSet={characteristicBorder} type="image/webp"/>
                                    <img src={characteristicBorder} alt="Рамка блока характеристики"/>
                                </picture>
                                <h5 className={cl.charlabel}>Инициатива</h5>
                                <span className={cl.charValue}>{modifier(dexterity)}</span>
                            </section>

                            <section className={cl.charBlock}>
                                <picture className={cl.border}>
                                    <source srcSet={characteristicBorder} type="image/webp"/>
                                    <img src={characteristicBorder} alt="Рамка блока характеристики"/>
                                </picture>
                                <h5 className={cl.charlabel}>Скорость</h5>
                                <span className={cl.charValue}>{race?.speed}</span>
                            </section>

                            <section className={cl.charBlock}>
                                <picture className={cl.border}>
                                    <source srcSet={characteristicBorder} type="image/webp"/>
                                    <img src={characteristicBorder} alt="Рамка блока характеристики"/>
                                </picture>
                                <h5 className={cl.charlabel}>Размер</h5>
                                <span className={clsx(cl.charValue, cl.charText)}>{race?.size}</span>
                            </section>

                            <section className={clsx(cl.charBlock, cl.blockExtended)}>
                                <picture className={cl.border}>
                                    <source srcSet={excharacteristicBorder} type="image/webp"/>
                                    <img src={excharacteristicBorder} alt="Рамка блока характеристики"/>
                                </picture>
                                <h5 className={cl.charlabel}>Пассивное восприятие</h5>
                                <span className={cl.charValue}>{10 + Math.floor((wisdom - 10) / 2)}</span>
                            </section>
                        </div>

                        <div className={cl.weaponBar}>
                            <picture className={cl.border}>
                                <source srcSet={weaponBorder} type="image/webp"/>
                                <img src={weaponBorder} alt="Рамка блока оружия и боевых ззаговоров"/>
                            </picture>

                            <h5 className={cl.label}>Оружие и боевые заговоры</h5>

                            <section className={cl.weapon}>
                                <span className={cl.weaponText}>Наименование</span>
                                <span className={cl.weaponText}>Бонус / Сложность</span>
                                <span className={cl.weaponText}>Урон / Вид</span>
                                <span className={cl.weaponText}>Заметки</span>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                                <div className={cl.weaponInput}>
                                    <input className={cl.input} type="text"/>
                                </div>
                            </section>
                        </div>

                        <div className={cl.classFeatures}>
                            <picture className={cl.border}>
                                <source srcSet={classBorder} type="image/webp"/>
                                <img src={classBorder} alt="Рамка блока классовых особенностей"/>
                            </picture>
                            <h5 className={cl.label}>Классовые особенности</h5>
                            <section className={cl.classColumns}>
                                <textarea style={{ borderRight: '1px solid rgb(255 203 93)'}} className={cl.classArea} defaultValue={classs?.skills.map(a => `${a.title}: ${a.description}`).join("\n\n")} />
                                <textarea className={cl.classArea} />
                            </section>
                        </div>

                        <div className={cl.classFeats}>
                            <section className={cl.featsColumn}>
                                <picture className={cl.border}>
                                    <source srcSet={featsBorder} type="image/webp"/>
                                    <img src={featsBorder} alt="Рамка блока рассовые особенностей"/>
                                </picture>
                                <h5 className={cl.label}>Рассовые особенности</h5>
                                <textarea className={cl.featsInput} defaultValue={race?.abilities.map(a => `${a.title}: ${a.description}`)
                                    .join("\n\n")}/>
                            </section>

                            <section className={cl.featsColumn}>
                                <picture className={cl.border}>
                                    <source srcSet={featsBorder} type="image/webp"/>
                                    <img src={featsBorder} alt="Рамка блока чертей =)"/>
                                </picture>
                                <h5 className={cl.label}>Черты</h5>
                                <textarea className={cl.featsInput} maxLength={625}/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(cl.charPage, cl.spellPage)}>
                <div className={cl.leftColumn}>
                    <div className={cl.spellInfo}>
                        <div className={cl.spellcastingAbility}>
                            <picture className={cl.border}>
                                <source srcSet={spellcastingBorder} type="image/webp"/>
                                <img src={spellcastingBorder} alt="Рамка блока заклинательных характеристик"/>
                            </picture>
                            <label className={cl.name1row}>
                                <span className={cl.text}>{classs?.spellcasting}</span>
                                <span className={cl.label}>Характеристика чар</span>
                            </label>
                            <span className={cl.spellValue}>
                              {classs?.spellcasting === "-"
                                  ? "-"
                                  : modifier(sheetPage?.characteristic?.[classs?.spellchar as keyof typeof sheetPage.characteristic] ?? 0)}
                            </span>
                            <span className={cl.label}>заклинательный модификатор</span>
                            <span className={cl.spellValue}>
                              {classs?.spellcasting === "-"
                                  ? "-"
                                  : 10 + Math.floor(((sheetPage?.characteristic?.[classs?.spellchar as keyof typeof sheetPage.characteristic] ?? 0) - 10) / 2)}
                            </span>
                            <span className={cl.label}>сложность спасброска</span>
                            <span className={cl.spellValue}>
                              {classs?.spellcasting === "-"
                                  ? "-"
                                  : 2 + Math.floor(((sheetPage?.characteristic?.[classs?.spellchar as keyof typeof sheetPage.characteristic] ?? 0) - 10) / 2)}
                            </span>
                            <span className={cl.label}>бонус атаки заклинанием</span>
                        </div>
                        <div className={cl.imageNslots}>
                            <div className={cl.spellImg}>

                            </div>

                            <div style={{ position: 'relative', height: '100px', width: '315px' }}>
                                <picture className={cl.border}>
                                    <source srcSet={spellslotsBorder} type="image/webp"/>
                                    <img src={spellslotsBorder} alt="Рамка блока ячеек заклинаний"/>
                                </picture>
                                <div className={cl.spellSlots}>
                                    <span className={cl.label}>ячейки заклинаний</span>
                                    <span></span>
                                    <span className={cl.spellTitle}>Всего</span>
                                    <span className={cl.spellTitle}>Потрачено</span>
                                    <span></span>
                                    <span className={cl.spellTitle}>Всего</span>
                                    <span className={cl.spellTitle}>Потрачено</span>
                                    <span></span>
                                    <span className={cl.spellTitle}>Всего</span>
                                    <span className={cl.spellTitle}>Потрачено</span>
                                    <span className={cl.featureName}>1-й</span>
                                    <input className={cl.input} type="text"/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>4-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>7-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>2-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>5-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>8-й</span>
                                    <input className={cl.input} type="text"/>
                                    <span>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>3-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>6-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                    <SkillBtn/>
                                </span>
                                    <span className={cl.featureName}>9-й</span>
                                    <input className={cl.input}
                                           type="text"
                                           inputMode="numeric"
                                           pattern="[0-9]*"
                                           onChange={e => {
                                               e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                           }}/>
                                    <span>
                                    <SkillBtn/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', height: '860px', width: '100%' }}>
                        <picture className={cl.border}>
                            <source srcSet={cantripsBorder} type="image/webp"/>
                            <img src={cantripsBorder} alt="Рамка блока ячеек заклинаний"/>
                        </picture>
                        <div className={cl.cantrips}>
                            <h5 className={cl.label}>Заговоры и подготовленные заклинания</h5>
                            <span className={cl.spellTitle}>Ур.</span>
                            <span className={cl.spellTitle}>Название</span>
                            <span className={cl.spellTitle}>Время создания</span>
                            <span className={cl.spellTitle}>Дальность</span>
                            <span className={cl.spellTitle}>Концентрация, ритуал, материал</span>
                            <span className={cl.spellTitle}>Заметки</span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <input className={cl.input} type="text"/>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <SkillBtn/>
                            <span className={cl.label}>К</span>
                            <SkillBtn/>
                            <span className={cl.label}>Р</span>
                            <SkillBtn/>
                            <span className={cl.label}>М</span>
                        </span>
                            <input className={cl.input} type="text"/>
                        </div> {/*Не открывать*/}
                    </div>

                </div>
                <div className={cl.rightColumn}>
                    <section className={cl.appearance}>
                        <picture className={cl.border}>
                            <source srcSet={appearanceBorder} type="image/webp"/>
                            <img src={appearanceBorder} alt="Рамка блока внешности"/>
                        </picture>
                        <h5 className={cl.label}>Внешность</h5>
                        <textarea className={cl.featsInput} maxLength={625}/>
                    </section>

                    <section className={cl.personality}>
                        <picture className={cl.border}>
                            <source srcSet={personalityBorder} type="image/webp"/>
                            <img src={personalityBorder} alt="Рамка блока личностных качеств"/>
                        </picture>
                        <h5 className={cl.label}>Предыстория и личные качества</h5>
                        <textarea className={cl.featsInput} maxLength={625}/>
                        <h5 className={cl.label}>Мировозрение</h5>
                        <input className={cl.input} type="text"/>
                    </section>

                    <section className={cl.languages}>
                        <picture className={cl.border}>
                            <source srcSet={languagesBorder} type="image/webp"/>
                            <img src={languagesBorder} alt="Рамка блока владения языками"/>
                        </picture>
                        <h5 className={cl.label}>Владение языками</h5>
                        <textarea className={cl.featsInput} maxLength={625}/>
                    </section>

                    <section className={cl.sequipment}>
                        <picture className={cl.border}>
                            <source srcSet={sequipmentBorder} type="image/webp"/>
                            <img src={sequipmentBorder} alt="Рамка блока снаряжения"/>
                        </picture>
                        <h5 className={cl.label}>Снаряжение</h5>
                        <textarea className={cl.featsInput} maxLength={625}/>
                        <h5 className={cl.label}>Настройка на магические предметы</h5>
                        <span className={cl.magicTool}>
                            <SkillBtn/>
                            <input className={cl.input} type="text"/>
                        </span>

                        <span className={cl.magicTool}>
                            <SkillBtn/>
                            <input className={cl.input} type="text"/>
                        </span>

                        <span className={cl.magicTool}>
                            <SkillBtn/>
                            <input className={cl.input} type="text"/>
                        </span>
                    </section>

                    <div style={{ position: 'relative', height: '70px', width: '100%' }}>
                        <picture className={cl.border}>
                            <source srcSet={languagesBorder} type="image/webp"/>
                            <img src={languagesBorder} alt="Рамка блока монет"/>
                        </picture>
                        <section className={cl.coins}>
                            <h5 className={cl.label}>Монеты</h5>
                            <span className={cl.spellTitle}>Медь</span>
                            <span className={cl.spellTitle}>Серебро</span>
                            <span className={cl.spellTitle}>Золото</span>
                            <span className={cl.spellTitle}>Электрум</span>
                            <span className={cl.spellTitle}>Платина</span>
                            <input className={cl.input}
                                   type="text"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   onChange={e => {
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                   }}
                            />
                            <input className={cl.input}
                                   type="text"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   onChange={e => {
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                   }}
                            />
                            <input className={cl.input}
                                   type="text"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   onChange={e => {
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                   }}
                            />
                            <input className={cl.input}
                                   type="text"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   onChange={e => {
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                   }}
                            />
                            <input className={cl.input}
                                   type="text"
                                   inputMode="numeric"
                                   pattern="[0-9]*"
                                   onChange={e => {
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                   }}
                            />
                        </section>
                    </div>

                </div>
            </div>

            <SheetPageBar
                prevPage={'/character/creation/skills'}
                onDownloadPdf={handleDownloadPdf}
            />
        </div>
    );
};
