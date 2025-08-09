import React, { useState } from 'react';
import cl from './SelectChars.module.css';
import { CharCounter } from "../CharCounter/CharCounter.tsx";
import type { Char } from "../types.ts";

type UserInput = {
    strengthValue: number;
    dexterityValue: number;
    constitutionValue: number;
    intelligenceValue: number;
    wisdomValue: number;
    charismaValue: number;
}

type SelectCharsProps = {
    characteristics: Char[];
    onTrackChars: React.Dispatch<React.SetStateAction<UserInput>>;
    onValidationCheck: (checkResult: boolean) => void;
}

const SelectChars = ({characteristics, onTrackChars, onValidationCheck}: SelectCharsProps) => {

    const checkMaxStats = (maxStatsCost: number): boolean => maxStatsCost === 27;

    const [strength, setStrength] = useState<number>(calculateStats(characteristics[0].strengthRecommendValue ?? 15));
    const [dexterity, setDexterity] = useState<number>(calculateStats(characteristics[1].dexterityRecommendValue ?? 14));
    const [constitution, setConstitution] = useState<number>(calculateStats(characteristics[2].constitutionRecommendValue ?? 13));
    const [intelligence, setIntelligence] = useState<number>(calculateStats(characteristics[3].wisdomRecommendValue ?? 12));
    const [wisdom, setWisdom] = useState<number>(calculateStats(characteristics[4].intelligenceRecommendValue ?? 10));
    const [charisma, setCharisma] = useState<number>(calculateStats(characteristics[5].charismaRecommendValue ?? 8));

    const maxStats = strength + dexterity + constitution + intelligence + wisdom + charisma;

    const blocks = Array.from({ length: 27 }, (_, i) => i);

    function calculateStats (stat: number)  {
        if (stat === 8) { return 0 }
        if (stat === 9) { return 1 }
        if (stat === 10) { return 2 }
        if (stat === 11) { return 3 }
        if (stat === 12) { return 4 }
        if (stat === 13) { return 5 }
        if (stat === 14) { return 7 }
        if (stat === 15) { return 9 }
        // @ts-ignore
        return 0
    }

    const changeStatsSum = (characteristic: {name: string; value: number}) => {
        const statCost = calculateStats(characteristic.value);

        let newStrength = strength;
        let newDexterity = dexterity;
        let newConstitution = constitution;
        let newIntelligence = intelligence;
        let newWisdom = wisdom;
        let newCharisma = charisma;

        switch (characteristic.name) {
            case "Сила":
                newStrength = statCost;
                setStrength(statCost);
                onTrackChars(prev => ({ ...prev, strengthValue: characteristic.value }));
                break;
            case "Ловкость":
                newDexterity = statCost;
                setDexterity(statCost);
                onTrackChars(prev => ({ ...prev, dexterityValue: characteristic.value }));
                break;
            case "Телосложение":
                newConstitution = statCost;
                setConstitution(statCost);
                onTrackChars(prev => ({ ...prev, constitutionValue: characteristic.value }));
                break;
            case "Интеллект":
                newIntelligence = statCost;
                setIntelligence(statCost);
                onTrackChars(prev => ({ ...prev, intelligenceValue: characteristic.value }));
                break;
            case "Мудрость":
                newWisdom = statCost;
                setWisdom(statCost);
                onTrackChars(prev => ({ ...prev, wisdomValue: characteristic.value }));
                break;
            case "Харизма":
                newCharisma = statCost;
                setCharisma(statCost);
                onTrackChars(prev => ({ ...prev, charismaValue: characteristic.value }));
                break;
        }

        const updatedMaxStats =
            newStrength +
            newDexterity +
            newConstitution +
            newIntelligence +
            newWisdom +
            newCharisma;

        onValidationCheck(checkMaxStats(updatedMaxStats));
    };


    return (
        <div className={cl.selectChars}>
            <div className={cl.charsGrid}>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[0].title} initial={characteristics[0].strengthRecommendValue} validation={maxStats}/>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[1].title} initial={characteristics[1].dexterityRecommendValue} validation={maxStats}/>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[2].title} initial={characteristics[2].constitutionRecommendValue} validation={maxStats}/>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[3].title} initial={characteristics[3].intelligenceRecommendValue} validation={maxStats}/>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[4].title} initial={characteristics[4].wisdomRecommendValue} validation={maxStats}/>
                <CharCounter statsTrack={changeStatsSum} charName={characteristics[5].title} initial={characteristics[5].charismaRecommendValue} validation={maxStats}/>
            </div>
            <div className={cl.statGrid}>
                {blocks.map((index) => (
                    <div
                        key={index}
                        className={`${cl.statBlock} ${index < maxStats ? cl.active : ''}`}
                    />
                ))}
            </div>
        </div>

    );
};

export default SelectChars;