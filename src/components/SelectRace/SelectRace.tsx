import type { Race } from "../types.ts";
import { RaceSelector } from "../RaceSelector/RaceSelector.tsx";
import { useState, useRef } from "react";
import { SelectSubRace } from "../SelectSubRace/SelectSubRace.tsx";
import type { SelectSubRaceHandle } from "../SelectSubRace/SelectSubRace.tsx";
import { userSlice } from "../../store/reducers/UserSlice.ts";
import { useAppDispatch } from "../../hooks/redux.ts";

type SelectListProps = {
    onSelectId: (value: number) => void;
    itemList: Race[];
}



const SelectRace = ({ itemList, onSelectId }: SelectListProps) => {

    const { setSubRace } = userSlice.actions
    const dispatch = useAppDispatch()

    // Начальное значение списка полученных расс
    const [currentId, setCurrentId] = useState<number>(0);

    // Переключение рассы колбеком (необходимо для currentSubItem)
    const selectId = (id: number) => {
        setCurrentId((id - 1) % itemList.length);
        onSelectId(id);
        dispatch(setSubRace(itemList[id - 1].subcomponents[0].subRaceId));
    }

    // Отображение списка подрасс для выбранной рассы
    const currentSubItems = itemList[currentId].subcomponents;

    // Получение доступа к дочернему API
    const subItemRef = useRef<SelectSubRaceHandle>(null);

    // Функция обнуления подрассы при переключении рассы
    const resetSubId = () => {
        subItemRef.current?.resetSubId();
    };

    return (
        <div>
            <RaceSelector
                itemList={itemList}
                onCreate={selectId}
                onTrackSwitch={resetSubId}
            />

            <SelectSubRace
                ref={subItemRef}
                subItemsList={currentSubItems}
            />
        </div>
    );
};

export default SelectRace;

