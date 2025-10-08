export const SkillsPageMock = {
    "screenId": "skillsSelection",
    "uuidSession": "039c7269-f4e4-4eb2-a72b-403134376b7c",
    "body": {
        "header": {
            "title": "Навыки"
        }
    },
    "mainInfo": {
        "components":
            {
                "amount": 2,
                "skills": ["История",
                    "Медицина",
                    "Проницательность",
                    "Религия",
                    "Убеждения"]
            }
    },
    "footer": {
        "components": [
            {
                "id": "rollBack",
                "title": "Назад",
                "actions": [
                    {
                        "method": "GET",
                        "href": "api/v1/character/creation/characteristics"
                    },
                    {
                        "method": "DELETE",
                        "href": "api/v1/character/creation/characteristics"
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
                        "method": "GET",
                        "href": "api/v1/character/creation/character-sheet"
                    }
                ]
            }
        ]
    }
}