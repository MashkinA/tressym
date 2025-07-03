import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from './routes';


export const AppRouter = () => {
    return (
        <Routes>
            {privateRoutes.map(route => 
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
        </Routes>
    );
};