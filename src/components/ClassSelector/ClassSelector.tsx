import { useState } from 'react';
import cl from './ClassSelector.module.css';
import type { Class } from "../types.ts";

type SliderSelectorProps = {
    onCreate: (value: number) => void;
    onTrackSwitch: () => void;
    itemList: Class[];
}
const MIDDLE_ITEM = 2;


export const ClassSelector = ({ itemList, onCreate, onTrackSwitch }: SliderSelectorProps) => {

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
        onCreate(itemList[(currentIndex - 1 + itemList.length) % itemList.length].classId);
    };

    // Функция перехода к предыдущему элементу из списка расс
    const toNextSlide = () => {
        onTrackSwitch();
        setCurrentIndex((prev) => (prev + 1) % itemList.length);
        onCreate(itemList[(currentIndex + 1) % itemList.length].classId);
    };

    const handleSlideClick = (index: number) => {
        onTrackSwitch();
        setCurrentIndex(index);
        onCreate(itemList[index].classId);
    };

    // Количество отображаемых элементов
    const visibleItems = getSlideIndex();

    return (
        <div className={cl.slider}>
            <div className={cl.prevBtn} onClick={toPrevSlide} />

            <div className={cl.slidesContainer}>
                {visibleItems.map((item, i) => (

                    <div
                        className={i === MIDDLE_ITEM ? cl.slideActive : cl.slide}
                        key={item}
                        onClick={() => handleSlideClick(item)}>
                        <img
                            className={cl.itemImage}
                            src={itemList[item].image}
                            alt="Изображение выбранного элемента класса"
                        />

                        <b className={cl.itemTitle}>{itemList[item].title}</b>

                        <div className={i === MIDDLE_ITEM ? cl.slideBack : cl.slideNoBack}/>
                    </div>

                ))}
            </div>

            <div className={cl.nextBtn} onClick={toNextSlide}/>

        </div>
    );
};