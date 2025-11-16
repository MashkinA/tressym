import cl from "../styles/CharacterSheetPage.module.css";
import clsx from "clsx";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { Loader } from "../components/Loader/Loader.tsx";
import type {Background, Class, SheetPageType, SubRace} from "../components/types.ts";
import {NavBar} from "../components/NavBar/NavBar.tsx";

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


export const CharacterSheetPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [sheetPage, setSheetPage] = useState<SheetPageType | null>(null);
    const [race, setRace] = useState<SubRace | null>(null);
    const [classs, setClasss] = useState<Class | null>(null);
    const [background, setBackground] = useState<Background | null>(null);

    const strength = sheetPage?.characteristic?.strength ?? 0;
    const dexterity = sheetPage?.characteristic?.dexterity ?? 0;
    const constitution = sheetPage?.characteristic?.constitution ?? 0;
    const intelligence = sheetPage?.characteristic?.intelligence ?? 0;
    const wisdom = sheetPage?.characteristic?.wisdom ?? 0;
    const charisma = sheetPage?.characteristic?.charisma ?? 0;

    const modifier = (count: number): string => {
        const value = Math.floor((count - 10) / 2);
        return value > 0 ? `+${value}` : `${value}`;
    };

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPage() {
            try {
                const userRes = await axios.get("http://localhost:3001/users/1", {
                    signal: controller.signal,
                });
                setSheetPage(userRes.data);

                if (userRes.data.race > 0) {
                    const raceRes = await axios.get("http://localhost:3001/raceSelection", {
                        signal: controller.signal,
                    });
                    const raceData = raceRes.data?.mainInfo?.components?.[userRes.data.race - 1];
                    const subRace = raceData?.subcomponents?.find((sub: any) => sub.subRaceId === userRes.data.subRace);
                    if (subRace) setRace(subRace);
                    console.log(subRace);
                }
                if (userRes.data.class > 0) {
                    const classRes = await axios.get("http://localhost:3001/classSelection", {
                        signal: controller.signal,
                    });
                    const classData = classRes.data?.mainInfo?.components?.[userRes.data.class - 1];
                    if (classData) setClasss(classData);
                }
                if (userRes.data.background > 0) {
                    const backgroundRes = await axios.get("http://localhost:3001/backgroundSelection", {
                        signal: controller.signal,
                    });
                    const backgroundData = backgroundRes.data?.mainInfo?.components?.[userRes.data.background - 1];
                    if (backgroundData) setBackground(backgroundData);
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
                            <span className={cl.label}>Предыстория</span>
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
                        <input className={cl.inputArmor} type="text"/>
                        <span className={cl.label}>Щит</span>
                        <div className={cl.shieldCheck}></div>
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
                                    <button className={cl.featureBtn}/>
                                    <button className={cl.featureBtn}/>
                                    <button className={cl.featureBtn}/>
                                </span>
                                <span className={cl.label}>Успехи</span>
                                <span>
                                    <button className={cl.featureBtn}/>
                                    <button className={cl.featureBtn}/>
                                    <button className={cl.featureBtn}/>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(strength)}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(strength)}</span>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(dexterity)}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(dexterity)}</span>
                                            <span className={cl.featureName}>Акробатика</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(dexterity)}</span>
                                            <span className={cl.featureName}>Ловкость рук</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(dexterity)}</span>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(constitution)}</span>
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
                                        <button className={cl.featureBtn}/>
                                        <button className={cl.featureBtn}/>
                                        <button className={cl.featureBtn}/>
                                        <button className={cl.featureBtn}/>
                                        <button className={cl.featureBtn}/>
                                        <button className={cl.featureBtn}/>
                                    </div>
                                </section>

                                <section className={clsx(cl.inspiration, cl.abilityBlock)}>
                                    <picture className={cl.border}>
                                        <source srcSet={inspirationBorder} type="image/webp"/>
                                        <img src={inspirationBorder} alt="Рамка блока вдохновения"/>
                                    </picture>
                                    <h5 className={cl.abilitiesH}>Героическое вдохновение</h5>
                                    <button className={cl.featureBtn}/>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
                                            <span className={cl.featureName}>Анализ</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
                                            <span className={cl.featureName}>История</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
                                            <span className={cl.featureName}>Магия</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
                                            <span className={cl.featureName}>Природа</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(intelligence)}</span>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
                                            <span className={cl.featureName}>Восприятие</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
                                            <span className={cl.featureName}>Выживание</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
                                            <span className={cl.featureName}>Медицина</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
                                            <span className={cl.featureName}>Проницательность</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(wisdom)}</span>
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
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(charisma)}</span>
                                            <span className={clsx(cl.featureName, cl.featureSave)}>Спасбросок</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(charisma)}</span>
                                            <span className={cl.featureName}>Выступление</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(charisma)}</span>
                                            <span className={cl.featureName}>Запугивание</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(charisma)}</span>
                                            <span className={cl.featureName}>Обман</span>
                                        </div>
                                        <div className={cl.feature}>
                                            <button className={cl.featureBtn}/>
                                            <span className={cl.featureValue}>{modifier(charisma)}</span>
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
                                    <button className={cl.featureBtn}/>
                                    <span className={cl.featureName}>Легкая</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <button className={cl.featureBtn}/>
                                    <span className={cl.featureName}>Средняя</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <button className={cl.featureBtn}/>
                                    <span className={cl.featureName}>Тяжелая</span>
                                </span>
                                <span className={cl.equipmentHeaderList}>
                                    <button className={cl.featureBtn}/>
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
                                <textarea className={cl.classArea} defaultValue={classs?.skills.map(a => `${a.title}: ${a.description}`).join("\n\n")} />
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

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/class'}
                nextPage={'/character/creation/characteristics'}
            />
        </div>
    );
};
