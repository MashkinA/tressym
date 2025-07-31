import type { Background } from "../types.ts";
import { useState } from "react";
import { BackSelector } from "../BackSelector/BackSelector.tsx";
import { BackDescription } from "../BackDescription/BackDescription.tsx";

type SelectBackProps = {
    onSelectId: (value: number) => void;
    itemList: Background[];
}

const SelectRace = ({ itemList, onSelectId }: SelectBackProps) => {

    // Начальное значение списка полученных предысторий
    const [currentId, setCurrentId] = useState<number>(0);

    // Переключение рассы колбеком (необходимо для currentSubItem)
    const selectId = (id: number) => {
        setCurrentId((id - 1) % itemList.length);
        onSelectId(id);
    }

    return (
        <div>
            <BackSelector
                itemList={itemList}
                onCreate={selectId}
            />
            <BackDescription
                selectedBack={itemList[currentId]}
            />

        </div>
    );
};

export default SelectRace;