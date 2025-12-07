import { StartPage } from "../pages/StartPage.tsx";
import { ErrorPage } from "../pages/ErrorPage.tsx";
import { CreateNamePage } from "../pages/CreateNamePage.tsx";
import { CreateRacePage } from "../pages/CreateRacePage.tsx";
import { CreateClassPage } from "../pages/CreateClassPage.tsx";
import { CreateBackgroundPage } from "../pages/CreateBackgroundPage.tsx";
import { CreateCharsPage } from "../pages/CreateCharsPage.tsx";
import { CreateSkillsPage } from "../pages/CreateSkillsPage.tsx";
import { CharacterSheetPage } from "../pages/CharacterSheetPage";
import { Registration } from "../pages/Registration.tsx";
import { Login } from "../pages/Login.tsx";

export const publicRoutes = [
  { path: "/", element: <StartPage /> },
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
];

export const privateRoutes = [
  { path: "/character/creation/name", element: <CreateNamePage /> },
  { path: "/character/creation/race", element: <CreateRacePage /> },
  { path: "/character/creation/class", element: <CreateClassPage /> },
  { path: "/character/creation/background", element: <CreateBackgroundPage /> },
  { path: "/character/creation/characteristics", element: <CreateCharsPage /> },
  { path: "/character/creation/skills", element: <CreateSkillsPage /> },
  { path: "/character/creation/character-sheet", element: <CharacterSheetPage /> },
];