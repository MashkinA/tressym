import { useState } from 'react';
import cl from './SliderSelector.module.css';
import type {Item} from "../types.ts";

type SliderSelectorProps = {
    onCreate: (value: string) => void;
    onTrackSwitch: () => void;
    itemList: Item[];
}

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
    const prevSlide = () => {
        onTrackSwitch();
        setCurrentIndex((prev) => (prev - 1 + itemList.length) % itemList.length);
        onCreate(itemList[(currentIndex - 1 + itemList.length) % itemList.length].raceId);
    };

    // Функция перехода к предыдущему элементу из списка расс
    const nextSlide = () => {
        onTrackSwitch();
        setCurrentIndex((prev) => (prev + 1) % itemList.length);
        onCreate(itemList[(currentIndex + 1) % itemList.length].raceId);
    };

    // Количество отображаемых элементов
    const visibleIndex = getSlideIndex();

    return (
        <div className={cl.slider}>
            <button className={cl.prevBtn} onClick={prevSlide}>
                &#10094;
            </button>

            <div className={cl.slidesContainer}>
                {visibleIndex.map((index, i) => (

                    <div className={i === 2 ? cl.slideActive : cl.slide} key={index}>
                        <img
                            className={cl.itemImage}
                            src={itemList[index].image}
                            alt="я не ебу как это описать"
                        />

                        <b className={cl.itemTitle}>{itemList[index].title}</b>
                    </div>

                ))}
            </div>

            <button className={cl.nextBtn} onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};
