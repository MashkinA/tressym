export type SubRaceAbilities = {
    title: string;
    description: string;
}

export type SubRaceChars = {
    value: number;
    title: string;
}

export type SubRace = {
    subRaceId: number;
    title: string;
    chars: SubRaceChars[];
    description: string;
    abilities: SubRaceAbilities[];
}

export type Race = {
    raceId: number;
    title: string;
    image: string;
    subcomponents: SubRace[];
}

export type ClassSkills = {
    string: string;
}

export type ClassSubComp = {
    string: string;
}

export type Class = {
    classId: number;
    title: string;
    image: string;
    description: string;
    detailedInfo: string;
    hits: string;
    skills: ClassSkills[];
    subcomponents: ClassSubComp[];
}