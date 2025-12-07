import React from "react";
import { Routes, Route } from "react-router-dom";
import { UseAuthCheck } from "../hooks/UseAuthCheck";
import { publicRoutes, privateRoutes } from "./routes";
import { ProtectedRoute, GuestRoute } from "./authRoutes";
import { ErrorPage } from "../pages/ErrorPage";
import { StartPage } from "../pages/StartPage";
import { Loader } from "../components/Loader/Loader";

export const AppRouter = () => {
    const { user, isFetchLoading } = UseAuthCheck();
    const isAuth = !!user;

    if (isFetchLoading) return <Loader />;

    return (
        <Routes>
            {publicRoutes.map((r) => {
                if (r.path === "/login" || r.path === "/registration") {
                    return (
                        <Route
                            key={r.path}
                            path={r.path}
                            element={<GuestRoute isAuth={isAuth}>{r.element}</GuestRoute>}
                        />
                    );
                }
                return <Route key={r.path} path={r.path} element={r.element} />;
            })}

            {privateRoutes.map((r) => (
                <Route
                    key={r.path}
                    path={r.path}
                    element={<ProtectedRoute isAuth={isAuth}>{r.element}</ProtectedRoute>}
                />
            ))}

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};
