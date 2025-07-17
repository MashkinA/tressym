export const NamePageMock = {
    "screenId": "nameSelection",
    "uuidSession": "22345200-abe8-4f60-90c8-0d43c5f6c0f6",
    "body": {
        "header": {
            "title": "Введите имя"
        }
    },
    "mainInfo": {
        "components": [
            {
                "name": "String",
                "description": "Имя персонажа должно соответствовать его расе и происхождению, а также отражать его характер и предысторию"
            }
        ]
    },
    "footer": {
        "components": [
            {
                "componentId": "rollBack",
                "title": "Назад",
                "actions": [
                    {
                        "method": "GET",
                        "href": "/api/v1/start"
                    }
                ]
            },
            {
                "componentId": "list",
                "title": "К листу",
                "actions": [
                    {
                        "method": "GET",
                        "href": "api/v1/character/creation/character-sheet"
                    }
                ]
            },
            {
                "componentId": "next",
                "title": "Далее",
                "actions": [
                    {
                        "method": "POST",
                        "href": "/api/v1/character/creation/name"
                    },
                    {
                        "method": "GET",
                        "href": "/api/v1/character/creation/race"
                    }
                ]
            }
        ]
    }
}