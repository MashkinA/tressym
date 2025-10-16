export const CharsPageMock = {
    "screenId": "characteristicSelection",
    "uuidSession": "22345200-abe8-4f60-90c8-0d43c5f6c0f6",
    "body": {
        "header": {
            "title": "Способности"
        }
    },
    "mainInfo": {
        "components": [
            {
                "characteristicId": 1,
                "title": "Сила",
                "strengthRecommendValue": 15
            },
            {
                "characteristicId": 2,
                "title": "Ловкость",
                "dexterityRecommendValue": 14
            },
            {
                "characteristicId": 3,
                "title": "Телосложение",
                "constitutionRecommendValue": 13
            },
            {
                "characteristicId": 4,
                "title": "Интеллект",
                "intelligenceRecommendValue": 12
            },
            {
                "characteristicId": 5,
                "title": "Мудрость",
                "wisdomRecommendValue": 10
            },
            {
                "characteristicId": 6,
                "title": "Харизма",
                "charismaRecommendValue": 8
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
                        "href": "api/v1/character/creation/background"
                    },
                    {
                        "method": "DELETE",
                        "href": "api/v1/character/creation/background"
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
                        "href": "api/v1/character/creation/characteristics"
                    },
                    {
                        "method": "GET",
                        "href": "api/v1/character/creation/skills"
                    }
                ]
            }
        ]
    }
}