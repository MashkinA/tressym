import { useState } from "react";
import { NavBar } from '../components/NavBar/NavBar';
import { SpeciesMock } from "../mocks/SpeciesMock.ts";
import SelectList from '../components/SelectList/SelectList';
import type {Item} from "../components/types.ts";
import cl from "../styles/Pages.module.css";

export const CreateSpeciesPage = () => {


    const species: Item[] = SpeciesMock.mainInfo.items;




    const [selectedId, setSelectedId] = useState<string>("1");
    const [selectedSubId, setSelectedSubId] = useState<string>("1");

    const userInput = {
        "component_id": "race",
        "value": selectedId,
        "sub_value": selectedSubId,
    }

    return (
        <div className={cl.pageWrapper}>
            <div className={cl.pageCreateHeader}>
                {SpeciesMock.body.header.title}
            </div>
            <SelectList
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