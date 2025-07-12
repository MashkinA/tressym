export type SubItemAbilities = {
    title: string;
    description: string;
}

export type SubItemChars = {
    value: string;
    title: string;
}

export type SubItem = {
    subraceId: string;
    title: string;
    chars: SubItemChars[];
    description: string;
    abilities: SubItemAbilities[];
}

export type Item = {
    raceId: string;
    title: string;
    image: string;
    subitems: SubItem[];
}