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
                method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                href: string;
            }[];
        }[];
    };
};

export type SpeciesPageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: Race[];
        footer: {
            components: {
                componentId: string;
                title: string;
                actions: {
                    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                    href: string;
                }[];
            }[];
        };
    };
};

export type ClassesPageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: Class[];
        footer: {
            components: {
                componentId: string;
                title: string;
                actions: {
                    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                    href: string;
                }[];
            }[];
        };
    };
};

export type BackPageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: Background[];
        footer: {
            components: {
                componentId: string;
                title: string;
                actions: {
                    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                    href: string;
                }[];
            }[];
        };
    };
};

export type CharPageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: Char[];
        footer: {
            components: {
                componentId: string;
                title: string;
                actions: {
                    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                    href: string;
                }[];
            }[];
        };
    };
};

export type SkillPageType = {
    screenId: string;
    uuidSession: string;
    body: {
        header: {
            title: string;
        };
    };
    mainInfo: {
        components: Skills;
        footer: {
            components: {
                componentId: string;
                title: string;
                actions: {
                    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
                    href: string;
                }[];
            }[];
        };
    };
};

export type SheetPageType = {
    id: number;
    name: string;
    race: number,
    class: number;
    background: number;
    characteristic: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number
        charisma: number;
    };
    skill: string[];
}

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