import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/user-auth";

export const RequaireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={"/auth/sign-in"} state={{ from: location }} />;
  }

  return children;
};
