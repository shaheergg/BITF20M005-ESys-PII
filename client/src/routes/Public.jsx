import React from "react";

import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

export const Public = () => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
};
