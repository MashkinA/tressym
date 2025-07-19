export const ClassesPageMock = {
    "screenId": "classSelection",
    "uuidSession": "22345200-abe8-4f60-90c8-0d43c5f6c0f6",
    "body": {
    "header": {
        "title": "Выбор класса"
    }
},
    "mainInfo": {
    "components": [
        {
            "classId": 1,
            "title": "Чародей",
            "image": "/assets/classes/sorcerer.webp",
            "description": "Чародеи являются носителями магии, дарованной им при рождении их экзотической родословной, неким потусторонним влиянием или воздействием неизвестных вселенских сил. Никто не может обучиться чародейству, как, например, выучить язык, так же как никто не может обучить, как прожить легендарную жизнь. Никто не может избрать путь чародейства, сила сама выбирает носителя",
            "detailedInfo": "https://dnd.su/class/101-sorcerer/",
            "hits": "1d6",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        },
        {
            "classId": 2,
            "title": "Волшебник",
            "image": "/assets/classes/wizard.webp",
            "description": "Находясь ли под предводительством могучего колдуна, или стараясь установить мир после многолетнего конфликта, орки и племена людей иногда заключали союзы, объединяя силы в огромные орды, терроризирующие более цивилизованные государства по соседству. Когда такие союзы скреплялись узами брака, появлялись полуорки. Некоторые полуорки возвышались, становясь гордыми вождями племён. Их человечья кровь давала им преимущество над их чистокровными соперниками. Другие отправлялись в мир, чтоб доказать своё превосходство над представителями более цивилизованных народов. Многие из них становились искателями приключений, достигая величия благодаря своим могучим свершениям, и дурной славы, благодаря варварским нравам и дикарской ярости",
            "detailedInfo": "https://dnd.su/class/105-wizard/",
            "hits": "1d6",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        },
        {
            "classId": 3,
            "title": "Воин",
            "image": "/assets/classes/fighter.webp",
            "description": "Опытный гладиатор сражается на арене, ловко используя трезубец и сеть, чтобы одолеть противника и порадовать толпу. Его враг сражается мечом, сверкающим молнией. Все они — воины: рыцари, завоеватели, чемпионы, наёмники и разбойники. Это мастера оружия, боя и доспехов, знакомые со смертью — как с чужой, так и со своей",
            "detailedInfo": "https://dnd.su/class/91-fighter/",
            "hits": "1d10",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        },
        {
            "classId": 4,
            "title": "Плут",
            "image": "/assets/classes/rogue.webp",
            "description": "Плуты полагаются на мастерство, скрытность и уязвимые места врагов, чтобы взять верх в любой ситуации. У них достаточно сноровки для нахождения решения в любой ситуации, демонстрируя находчивость и гибкость, которые являются краеугольным камнем любой успешной группы искателей приключений.",
            "detailedInfo": "https://dnd.su/class/99-rogue/",
            "hits": "1d8",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        },
        {
            "classId": 5,
            "title": "Следопыт",
            "image": "/assets/classes/ranger.webp",
            "description": "Вдали от суеты городов и посёлков, за изгородями, которые защищают самые далёкие фермы от ужасов дикой природы, среди плотно стоящих деревьев, беспутья лесов и на просторах необъятных равнин следопыты несут свой бесконечный дозор.",
            "detailedInfo": "https://dnd.su/class/97-ranger/",
            "hits": "1d10",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        },
        {
            "classId": 6,
            "title": "Варвар",
            "image": "/assets/classes/barbarian.webp",
            "description": "Всех варваров объединяет ярость — дикая, неукротимая, как шторм или хищник в бою. Для одних она связана с духами зверей, для других — с гневом на жестокий мир. Но для всех это источник силы, стойкости и боевого безумия.",
            "detailedInfo": "https://dnd.su/class/87-barbarian/",
            "hits": "1d12",
            "skills": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ],
            "subcomponents": [
                {
                    "string": "string"
                },
                {
                    "string": "string"
                }
            ]
        }
    ]
},
    "footer": {
    "components": [
        {
            "id": "rollBack",
            "title": "Назад",
            "actions": [
                {
                    "method": "GET",
                    "href": "api/v1/character/creation/race"
                },
                {
                    "method": "DELETE",
                    "href": "api/v1/character/creation/race"
                }
            ]
        },
        {
            "id": "character-sheet",
            "title": "К листу",
            "actions": [
                {
                    "method": "GET",
                    "href": "/api/v1/character/creation/character-sheet"
                }
            ]
        },
        {
            "id": "next",
            "title": "Далее",
            "actions": [
                {
                    "method": "PATCH",
                    "href": "api/v1/character/creation/class"
                },
                {
                    "method": "GET",
                    "href": "api/v1/character/creation/background"
                }
            ]
        }
    ]
}
}