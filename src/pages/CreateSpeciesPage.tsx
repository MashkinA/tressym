import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import SelectWidget from '../components/SelectWidget/SelectWidget.tsx';
import type {Item} from "../components/types.ts";
import cl from "../styles/Pages.module.css";
import { SpeciesPageMock } from "../mocks/SpeciesPageMock.ts";

export const CreateSpeciesPage = () => {

    const species: Item[] = SpeciesPageMock.mainInfo.components;

    const [selectedId, setSelectedId] = useState<number>(1);
    const [selectedSubId, setSelectedSubId] = useState<number>(1);

    const userInput = {
        "component_id": "race",
        "value": selectedId,
        "sub_value": selectedSubId,
    }

    return (
        <div className={cl.pageWrapper}>
            <div className={cl.pageCreateHeader}>
                {SpeciesPageMock.body.header.title}
            </div>
            <SelectWidget
                itemList={species}
                onSelectId={setSelectedId}
                onSelectSubId={setSelectedSubId}
            />

            <NavBar
                isValidationCorrect={true}
                prevPage={'/character/creation/name'}
                nextPage={'/class'}
            />

        </div>
    );
};