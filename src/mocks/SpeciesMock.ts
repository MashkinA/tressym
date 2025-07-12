export const SpeciesMock = {
    "screenId": "raceSelection",
    "body": {
        "header": {
            "title": "Выбор расы"
        }
    },
    "mainInfo": {
        "items": [
            {
                "raceId": "1",
                "title": "Тифлинг",
                "image": "/assets/species/tiefling.webp",
                "subitems": [
                    {
                        "subraceId": "1",
                        "title": "Тифлинг",
                        "chars": [
                            {
                                "value": "1",
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
                "raceId": "2",
                "title": "Полурослик",
                "image": "/assets/species/halfling.webp",
                "subitems": [
                    {
                        "subraceId": "1",
                        "title": "Коренастый",
                        "chars": [
                            {
                                "value": "1",
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
                        "subraceId": "2",
                        "title": "Легконогий",
                        "chars": [
                            {
                                "value": "1",
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
                "raceId": "3",
                "title": "Эльф",
                "image": "/assets/species/elf.webp",
                "subitems": [
                    {
                        "subraceId": "1",
                        "title": "Высший эльф",
                        "chars": [
                            {
                                "value": "1",
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
                        "subraceId": "2",
                        "title": "Лесной эльф",
                        "chars": [
                            {
                                "value": "1",
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
                "raceId": "4",
                "title": "Полуорк",
                "image": "/assets/species/halfOrc.webp",
                "subitems": [
                    {
                        "subraceId": "1",
                        "title": "Полуорк",
                        "chars": [
                            {
                                "value": "1",
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
                "raceId": "5",
                "title": "Человек",
                "image": "/assets/species/human.webp",
                "subitems": [
                    {
                        "subraceId": "1",
                        "title": "Человек",
                        "chars": [
                            {
                                "value": "1",
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
                    "id": "rollBack",
                    "title": "Назад",
                    "actions": [
                        {
                            "method": "GET",
                            "href": "!!Вставить ручку!!"
                        }
                    ]
                },
                {
                    "id": "list",
                    "title": "К листу",
                    "actions": [
                        {
                            "method": "GET",
                            "href": "!!Вставить ручку!!"
                        }
                    ]
                },
                {
                    "id": "next",
                    "title": "Далее",
                    "actions": [
                        {
                            "method": "POST",
                            "href": "api/v1.0/tressym/character/creation/race"
                        },
                        {
                            "method": "GET",
                            "href": "api/v1/tressym/character/creation/class"
                        }
                    ]
                }
            ]
        }
    }
}