import cl from "../styles/CharacterSheetPage.module.css";
import clsx from "clsx";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Loader} from "../components/Loader/Loader.tsx";
import type { SheetPageType } from "../components/types.ts";

const a = "dd"
const attemptsImg = "/assets/icons/hitsAttempt.webp";
const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";

export const CharacterSheetPage = () => {

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [sheetPage, setSheetPage] = useState<SheetPageType | null>(null);

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
        async function fetchPage() {
            try {
                const response = await axios.get("http://localhost:3001/users/1");
                setSheetPage(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchPage();
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
                        <span className={clsx(cl.borderCorner, cl.cornerTL, cl.cornerCircle)}></span>
                        <label className={cl.name1row}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Имя персонажа</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Предыстория</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Класс</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Раса</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Подкласс</span>
                        </label>
                    </div>

                    <div className={cl.lvl}>
                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Уровень</span>
                        </label>

                        <label className={cl.sheetLabel}>
                            <input className={cl.input} type="text" placeholder={a}/>
                            <span className={cl.label}>Опыт</span>
                        </label>
                    </div>

                    <div className={cl.armor}>
                        <svg
                            className={cl.shield}
                            width="90"
                            height="100"
                            viewBox="0 0 90 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 0.5L2 0.5L5.5 2.5L9 0.5Z"
                                fill="#A9A9AC"
                                stroke="#A9A9AC"
                            />
                            <path
                                d="M88 0.5L81 0.5L84.5 2.5L88 0.5Z"
                                fill="#A9A9AC"
                                stroke="#A9A9AC"
                            />
                            <path
                                d="M84 1H6V64C6 70 41 99 45 99C49 99 84 70 84 64V1Z"
                                fill="transparent"
                                stroke="#A9A9AC"
                                strokeWidth="2"
                            />
                        </svg>

                        <span className={cl.label}>Класс защиты</span>
                        <input className={cl.inputArmor} type="text" placeholder={a}/>
                        <span className={cl.label}>Щит</span>
                        <div className={cl.shieldCheck}></div>

                    </div>

                    <div className={cl.hits}>
                        <div className={cl.hitPoints}>
                            <h5 className={cl.hitHeader}>ХИТЫ</h5>

                            <label className={cl.sheetLabel}>
                                <input className={cl.input} type="text" placeholder={a}/>
                                <span className={cl.label}>Текущие</span>
                            </label>

                            <label className={cl.sheetLabel}>
                                <input className={cl.input} type="text" placeholder={a}/>
                                <span className={cl.label}>Временные</span>
                                <input className={cl.input} type="text" placeholder={a}/>
                                <span className={cl.label}>Максимум</span>
                            </label>
                        </div>

                        <div className={cl.hitDice}>
                            <h5 className={cl.hitHeader}>КОСТИ ХИТОВ</h5>
                            <label className={cl.sheetLabel}>
                                <input className={cl.input} type="text" placeholder={a}/>
                                <span className={cl.label}>Текущие</span>
                                <input className={cl.input} type="text" placeholder={a}/>
                                <span className={cl.label}>Кости</span>
                            </label>
                        </div>

                        <div className={cl.deathSaves}>
                            <h5 className={cl.hitHeader}>БРОСКИ</h5>
                            <label className={cl.sheetLabel}>
                                <img className={cl.attempts} src={ attemptsImg }  alt="Попытки бросков" />
                                <span className={cl.label}>Успехи</span>
                                <img className={cl.attempts} src={ attemptsImg }  alt="Попытки бросков" />
                                <span className={cl.label}>Провалы</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={cl.sheetLogo}>
                    <img className={cl.logoTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                    <img className={cl.logoTressym} src={ tressym }  alt="Трессум" />
                    <img className={cl.logoTracery} src={ tracery }  alt="Ажурный узор в шапке страницы" />
                </div>

                <div className={cl.sheetMain}>
                    <div className={cl.mainStats}>
                        <div className={cl.abilities}>
                            <div className={cl.abilitiesColumn}>
                                <section className={cl.proficiency}>
                                    <h5 className={cl.abilitiesH}>Бонус владения</h5>
                                    <input className={cl.abilitiesInput} type="text" placeholder={a}/>
                                </section>

                                <section className={clsx(cl.strength, cl.abilityBlock)}>
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
                                    <h5 className={cl.abilitiesH}>Героическое вдохновение</h5>
                                    <button className={cl.featureBtn}/>
                                </section>
                            </div>

                            <div className={cl.abilitiesColumn}>
                                <section className={clsx(cl.intelligence, cl.abilityBlock)}>
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
                                <h5 className={cl.label}>Инициатива</h5>
                                <span className={cl.charValue}>{modifier(dexterity)}</span>
                            </section>

                            <section className={cl.charBlock}>
                                <h5 className={cl.label}>Скорость</h5>
                                <span className={cl.charValue}>30</span>
                            </section>

                            <section className={cl.charBlock}>
                                <h5 className={cl.label}>Размер</h5>
                                <span className={clsx(cl.charValue, cl.charText)}>Средний</span>
                            </section>

                            <section className={clsx(cl.charBlock, cl.blockExtended)}>
                                <h5 className={cl.label}>Пассивное восприятие</h5>
                                <span className={cl.charValue}>{10 + Math.floor((wisdom - 10) / 2)}</span>
                            </section>
                        </div>

                        <div className={cl.weaponBar}>
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
                            <h5 className={cl.label}>Классовые особенности</h5>
                            <section className={cl.classColumns}>
                                <textarea className={cl.classArea} maxLength={625}/>
                                <textarea className={cl.classArea} maxLength={625}/>
                            </section>
                        </div>

                        <div className={cl.classFeats}>
                            <section className={cl.featsColumn}>
                                <h5 className={cl.label}>Рассовые особенности</h5>
                                <textarea className={cl.featsInput} maxLength={625}/>
                            </section>

                            <section className={cl.featsColumn}>
                                <h5 className={cl.label}>Черты</h5>
                                <textarea className={cl.featsInput} maxLength={625}/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
