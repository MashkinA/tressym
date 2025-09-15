import type { Class } from "../types.ts";
import { useState } from "react";
import {ClassSelector} from "../ClassSelector/ClassSelector.tsx";

type SelectListProps = {
    onSelectId: (value: number) => void;
    itemList: Class[];
}

const SelectRace = ({ itemList, onSelectId }: SelectListProps) => {

    // Начальное значение списка полученных классов
    const [currentId, setCurrentId] = useState<number>(0);

    // Переключение рассы колбеком (необходимо для currentSubItem)
    const selectId = (id: number) => {
        setCurrentId((id - 1) % itemList.length);
        onSelectId(id);
    }

    return (
        <div>
            <ClassSelector
                itemList={itemList}
                onCreate={selectId}
            />

        </div>
    );
};

export default SelectRace;

