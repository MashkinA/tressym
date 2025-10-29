import cl from "../styles/CharacterSheetPage.module.css";
import clsx from "clsx";
import { TressymHeaderPages } from "../components/TressymHeader/TressymHeaderPages.tsx";

const a = "dd"
const attemptsImg = "/assets/icons/hitsAttempt.webp";
const tracery = "/assets/icons/tracery.webp";
const tressym = "/assets/icons/tressym.webp";

export const CharacterSheetPage = () => {

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
                                stroke-width="2"
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

                                <section className={cl.strength}>
                                    <h5 className={cl.abilitiesH}>Сила</h5>
                                    <div className={cl.modifier}>

                                    </div>
                                    <div className={cl.strength}>

                                    </div>
                                </section>

                                <section className={cl.proficiency}>
                                    <h5 className={cl.abilitiesH}>Ловкость</h5>
                                    <input className={cl.abilitiesInput} type="text" placeholder={a}/>
                                </section>

                                <section className={cl.proficiency}>
                                    <h5 className={cl.abilitiesH}>Телосложение</h5>
                                    <input className={cl.abilitiesInput} type="text" placeholder={a}/>
                                </section>

                                <section className={cl.proficiency}>
                                    <h5 className={cl.abilitiesH}>Истощение</h5>
                                    <input className={cl.abilitiesInput} type="text" placeholder={a}/>
                                </section>

                                <section className={cl.proficiency}>
                                    <h5 className={cl.abilitiesH}>Героическое вдохновение</h5>
                                    <input className={cl.abilitiesInput} type="text" placeholder={a}/>
                                </section>
                            </div>

                            <div className={cl.abilitiesColumn}>

                            </div>
                        </div>
                    </div>
                    <div className={cl.mainFeatures}>

                    </div>
                </div>
            </div>
        </div>
    );
};
