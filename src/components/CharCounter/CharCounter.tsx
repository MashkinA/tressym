import { useState } from "react";
import cl from './CharCounter.module.css'

type statsTrackProp = {
    name: string;
    value: number;
}

type CharCounterProps = {
    statsTrack: (value: statsTrackProp) => void;
    charName: string;
    initial: number | undefined;
    validation: number;
}

export const CharCounter = ({statsTrack, charName, initial, validation}: CharCounterProps) => {
    const [count, setCount] = useState<number>(initial ?? 100);

    function calculateStats(stat: number): number {
        switch (stat) {
            case 8: return 0;
            case 9: return 1;
            case 10: return 2;
            case 11: return 3;
            case 12: return 4;
            case 13: return 5;
            case 14: return 7;
            case 15: return 9;
            default: return 0;
        }
    }

    const currentStatCost = calculateStats(count);
    const nextStatCost = calculateStats(count + 1);
    const newValidation = validation - currentStatCost + nextStatCost;
    
    function increment() {
        if (count === 15 || validation === 27 || newValidation > 27) {
            return
        }
        setCount(count + 1)
        statsTrack({
            name: charName,
            value: count + 1,
        })
    }

    function decrement () {
        if (count === 8) {
            return
        }
        setCount(count - 1)
        statsTrack({
            name: charName,
            value: count - 1,
        })

    }

    const modifier = Math.floor((count - 10)/2)

    return (
        <div className={cl.charCounter}>
            <div className={cl.modifier}>{modifier}</div>
            <div className={cl.valueBlock}>
                <button className={count === 8 ? cl.btnDisabled : cl.btn} onClick = {decrement}>-</button>
                <div className={cl.value}>{count}</div>
                <button className={count === 15 || validation === 27 || newValidation > 27 ? cl.btnDisabled : cl.btn} onClick = {increment}>+</button>
            </div>
            <h2 className={cl.charName}>{charName}</h2>
        </div>
    );
};