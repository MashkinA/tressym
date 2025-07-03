import StartPage from "../pages/StartPage";
import ErrorPage from "../pages/ErrorPage";
/*import CreateNamePage from "../pages/CreateNamePage";
import CreateSpeciesPage from "../pages/CreateSpeciesPage";
import CreateClassPage from "../pages/CreateClassPage";
import CreateBackgroundPage from "../pages/CreateBackgroundPage";
import СreateCharsPage from "../pages/СreateCharsPage";
*/



export const privateRoutes = [
  { path: "*", element: <ErrorPage />, exact: true },
  { path: "/", element: <StartPage />, exact: true },
]