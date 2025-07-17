export const startingPageMock = {
  "screenId": "startPage",
  "body": {
    "mainInfo": {
      "components": [
        {
          "componentId": "characterCreation",
          "title": "Создать персонажа",
          "actions": [
            {
              "method": "GET",
              "href": "/api/v1/character/creation/name"
            }
          ]
        }
      ]
    }
  }
}