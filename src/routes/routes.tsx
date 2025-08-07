import { StartPage } from "../pages/StartPage.tsx";
import { ErrorPage } from "../pages/ErrorPage.tsx";
import { CreateNamePage } from "../pages/CreateNamePage.tsx";
import { CreateRacePage } from "../pages/CreateRacePage.tsx";
import { CreateClassPage } from "../pages/CreateClassPage.tsx";
import { CreateBackgroundPage } from "../pages/CreateBackgroundPage.tsx";
import { CreateCharsPage } from "../pages/CreateCharsPage.tsx";

export const privateRoutes = [
  { path: "*", element: <ErrorPage />, exact: true },
  { path: "/", element: <StartPage />, exact: true },
  { path: "/character/creation/name", element: <CreateNamePage />, exact: true },
  { path: "/character/creation/race", element: <CreateRacePage />, exact: true },
  { path: "/character/creation/class", element: <CreateClassPage />, exact: true },
  { path: "/character/creation/background", element: <CreateBackgroundPage />, exact: true },
  { path: "/character/creation/characteristics", element: <CreateCharsPage />, exact: true },
]