export const SpeciesPageMock = {
    "screenId": "raceSelection",
    "uuidSession": "22345200-abe8-4f60-90c8-0d43c5f6c0f6",
    "body": {
    "header": {
        "title": "Выбор расы"
    }
},
    "mainInfo": {
    "components": [
        {
            "raceId": 1,
            "title": "Тифлинг",
            "image": "/assets/species/tiefling.webp",
            "subcomponents": [
                {
                    "subRaceId": 1,
                    "title": "Тифлинг",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Интеллект"
                        }
                    ],
                    "description": "Заполнить описание тифлинга",
                    "abilities": [
                        {
                            "title": "Способность",
                            "description": "Описание способности"
                        }
                    ]
                }
            ]
        },
        {
            "raceId": 2,
            "title": "Полурослик",
            "image": "/assets/species/halfling.webp",
            "subcomponents": [
                {
                    "subRaceId": 1,
                    "title": "Коренастый",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Телосложение"
                        }
                    ],
                    "description": "Коренастые полурослики выносливее других и обладают некоторой устойчивостью к ядам. Поговаривают, что в их жилах течёт толика дварфской крови. В мире Забытых Королевств таких полуросликов зовут сильными сердцем, и чаще всего они встречаются на юге",
                    "abilities": [
                        {
                            "title": "Устойчивость коренастых",
                            "description": "Вы совершаете с преимуществом спасброски от яда, и вы получаете сопротивление урону ядом"
                        }
                    ]
                },
                {
                    "subRaceId": 2,
                    "title": "Легконогий",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Харизма"
                        }
                    ],
                    "description": "Легконогие полурослики умеют отлично скрываться, в том числе используя других существ как укрытие. Они приветливы и хорошо ладят с другими. В мире Забытых Королевств легконогие являются самой распространённой ветвью полуросликов. Легконогие более других склонны к перемене мест, и часто селятся по соседству с другими народами, или ведут кочевую жизнь. В мире Серого Ястреба таких полуросликов называют мохноногими или великанчиками",
                    "abilities": [
                        {
                            "title": "Естественная скрытность",
                            "description": "Вы можете предпринять попытку скрыться даже если заслонены только существом, превосходящими вас в размере как минимум на одну категорию"
                        }
                    ]
                }
            ]
        },
        {
            "raceId": 3,
            "title": "Эльф",
            "image": "/assets/species/elf.webp",
            "subcomponents": [
                {
                    "subRaceId": 1,
                    "title": "Высший эльф",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Интеллект"
                        }
                    ],
                    "description": "Заполнить описание высшего эльфа",
                    "abilities": [
                        {
                            "title": "Способность",
                            "description": "Описание способности"
                        }
                    ]
                },
                {
                    "subRaceId": 2,
                    "title": "Лесной эльф",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Интеллект"
                        }
                    ],
                    "description": "Заполнить описание лесного эльфа",
                    "abilities": [
                        {
                            "title": "Способность",
                            "description": "Описание способности"
                        }
                    ]
                }
            ]
        },
        {
            "raceId": 4,
            "title": "Полуорк",
            "image": "/assets/species/halfOrc.webp",
            "subcomponents": [
                {
                    "subRaceId": 1,
                    "title": "Полуорк",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Интеллект"
                        }
                    ],
                    "description": "Заполнить описание полуорка",
                    "abilities": [
                        {
                            "title": "Способность",
                            "description": "Описание способности"
                        }
                    ]
                }
            ]
        },
        {
            "raceId": 5,
            "title": "Человек",
            "image": "/assets/species/human.webp",
            "subcomponents": [
                {
                    "subRaceId": 1,
                    "title": "Человек",
                    "chars": [
                        {
                            "value": 1,
                            "title": "Интеллект"
                        }
                    ],
                    "description": "Заполнить описание человека",
                    "abilities": [
                        {
                            "title": "Способность",
                            "description": "Описание способности"
                        }
                    ]
                }
            ]
        }
    ],
        "footer": {
        "components": [
            {
                "componentId": "rollBack",
                "title": "Назад",
                "actions": [
                    {
                        "method": "GET",
                        "href": "/api/v1/character/creation/name"
                    },
                    {
                        "method": "DELETE",
                        "href": "/api/v1/character/creation/name"
                    }
                ]
            },
            {
                "componentId": "character-sheet",
                "title": "К листу",
                "actions": [
                    {
                        "method": "GET",
                        "href": "/api/v1/character/creation/character-sheet"
                    }
                ]
            },
            {
                "componentId": "next",
                "title": "Далее",
                "actions": [
                    {
                        "method": "PATCH",
                        "href": "/api/v1/character/creation/race"
                    },
                    {
                        "method": "GET",
                        "href": "/api/v1/character/creation/class"
                    }
                ]
            }
        ]
    }
}
}