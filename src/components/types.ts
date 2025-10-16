export type NamePageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: {
            name: string;
            description: string;
        }[];
    };
    footer: {
        components: {
            componentId: string;
            title: string;
            actions: {
                method: string;
                href: string;
            }[];
        }[];
    };
};

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
    title: string;
    description: string[];
}

export type Class = {
    classId: number;
    title: string;
    image: string;
    description: string;
    detailedInfo: string;
    hits: string;
    skills: ClassSkills[];
}

export type Background = {
    backgroundId: number;
    title: string;
    image: string;
    description: string;
    detailedInfo: string;
    skill: string;
    attainments: string[];
    instruments: string[];
    equipment: string[];
}

export type Char = {
    characteristicId: number;
    title: string;
    strengthRecommendValue?: number;
    dexterityRecommendValue?: number;
    constitutionRecommendValue?: number;
    intelligenceRecommendValue?: number;
    wisdomRecommendValue?: number;
    charismaRecommendValue?: number;
}

export type Skills = {
    amount: number;
    skills: string[];
}