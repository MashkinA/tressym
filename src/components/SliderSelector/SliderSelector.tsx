import { useState } from 'react';
import cl from './SliderSelector.module.css';
import type {Item} from "../types.ts";

type SliderSelectorProps = {
    onCreate: (value: number) => void;
    onTrackSwitch: () => void;
    itemList: Item[];
}
const MIDDLE_ITEM = 2;

export const SliderSelector = ({ itemList, onCreate, onTrackSwitch }: SliderSelectorProps) => {

    // Начальное значение элемента из списка расс
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Определение количества отображаемых элементов на странице
    const getSlideIndex = (): number[] => {
        const len = itemList.length;
        return [
            (currentIndex - 2 + len) % len,
            (currentIndex - 1 + len) % len,
            currentIndex % len,
            (currentIndex + 1) % len,
            (currentIndex + 2) % len,
        ];
    };

    // Функция перехода к следующему элементу из списка расс
    const toPrevSlide = () => {
        onTrackSwitch();
        setCurrentIndex((prev) => (prev - 1 + itemList.length) % itemList.length);
        onCreate(itemList[(currentIndex - 1 + itemList.length) % itemList.length].raceId);
    };

    // Функция перехода к предыдущему элементу из списка расс
    const toNextSlide = () => {
        onTrackSwitch();
        setCurrentIndex((prev) => (prev + 1) % itemList.length);
        onCreate(itemList[(currentIndex + 1) % itemList.length].raceId);
    };

    // Количество отображаемых элементов
    const visibleItems = getSlideIndex();

    return (
        <div className={cl.slider}>
            <button className={cl.prevBtn} onClick={toPrevSlide}>
                &#10094;
            </button>

            <div className={cl.slidesContainer}>
                {visibleItems.map((item, i) => (

                    <div className={i === MIDDLE_ITEM ? cl.slideActive : cl.slide} key={item}>
                        <img
                            className={cl.itemImage}
                            src={itemList[item].image}
                            alt="Изображение выбранного элемента рассы/класса/предыстории"
                        />

                        <b className={cl.itemTitle}>{itemList[item].title}</b>
                    </div>

                ))}
            </div>

            <button className={cl.nextBtn} onClick={toNextSlide}>
                &#10095;
            </button>
        </div>
    );
};
