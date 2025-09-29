export const NamePageMock = {
    "screenId": "nameSelection",
    "uuidSession": "22345200-abe8-4f60-90c8-0d43c5f6c0f6",
    "body": {
        "header": {
            "title": "Имя"
        }
    },
    "mainInfo": {
        "components": [
            {
                "name": "String",
                "description": "* Имя вашего персонажа зависит от расы, класса, мировоззрения и предыстории персонажа, а также от его предыстории. Помните, самое короткое имя в Фаэруне принадлежало колдунье - Ио"
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