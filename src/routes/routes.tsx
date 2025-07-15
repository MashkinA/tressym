import { StartPage } from "../pages/StartPage.tsx";
import { ErrorPage } from "../pages/ErrorPage.tsx";
import { CreateNamePage } from "../pages/CreateNamePage.tsx";
import { CreateSpeciesPage } from "../pages/CreateSpeciesPage.tsx";


export const privateRoutes = [
  { path: "*", element: <ErrorPage />, exact: true },
  { path: "/", element: <StartPage />, exact: true },
  { path: "/character/creation/name", element: <CreateNamePage />, exact: true },
  { path: "/character/creation/species", element: <CreateSpeciesPage />, exact: true },
]