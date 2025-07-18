import type { Item } from "../types.ts";
import { SliderSelector } from "../SliderSelector/SliderSelector.tsx";
import { useState, useRef } from "react";
import { SelectSubItem } from "../SelectSubItem/SelectSubItem.tsx";
import type { SelectSubItemHandle } from "../SelectSubItem/SelectSubItem.tsx";

type SelectListProps = {
    onSelectId: (value: number) => void;
    onSelectSubId: (value: number) => void;
    itemList: Item[];
}

const SelectWidget = ({ itemList, onSelectId, onSelectSubId }: SelectListProps) => {

    // Начальное значение списка полученных расс
    const [currentId, setCurrentId] = useState<number>(0);

    // Переключение рассы колбеком (необходимо для currentSubItem)
    const selectId = (id: number) => {
        setCurrentId((id - 1) % itemList.length);
        onSelectId(id);
        onSelectSubId(itemList[id - 1].subcomponents[0].subRaceId);
    }
    // Отправка колбека выбранной подрассы наверх
    const selectSubId = (subId: number) => {
        onSelectSubId(subId);
    }

    // Отображение списка подрасс для выбранной рассы
    const currentSubItems = itemList[currentId].subcomponents;

    // Получение доступа к дочернему API
    const subItemRef = useRef<SelectSubItemHandle>(null);

    // Функция обнуления подрассы при переключении рассы
    const resetSubId = () => {
        subItemRef.current?.resetSubId();
    };

    return (
        <div>

            <SliderSelector
                itemList={itemList}
                onCreate={selectId}
                onTrackSwitch={resetSubId}
            />

            <SelectSubItem
                ref={subItemRef}
                subItemsList={currentSubItems}
                onCreate={selectSubId}
            />

        </div>
    );
};

export default SelectWidget;

