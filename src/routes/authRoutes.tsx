import React from "react";
import { Navigate } from "react-router-dom";

type Props = { children: JSX.Element; isAuth: boolean };

export const ProtectedRoute = ({ children, isAuth }: Props) => {
    return isAuth ? children : <Navigate to="/login" replace />;
};

export const GuestRoute = ({ children, isAuth }: Props) => {
    return isAuth ? <Navigate to="/" replace /> : children;
};
