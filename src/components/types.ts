export type SubItemAbilities = {
    title: string;
    description: string;
}

export type SubItemChars = {
    value: number;
    title: string;
}

export type SubComp = {
    subRaceId: number;
    title: string;
    chars: SubItemChars[];
    description: string;
    abilities: SubItemAbilities[];
}

export type Item = {
    raceId: number;
    title: string;
    image: string;
    subcomponents: SubComp[];
}