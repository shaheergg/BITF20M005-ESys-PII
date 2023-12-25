import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const Private = () => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" />;

  return <Outlet />;
};
