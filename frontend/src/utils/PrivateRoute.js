import { Outlet, Navigate } from "react-router";
import React from "react";
import { useUser } from "../context/userContext/userContext";

const PrivateRoutes = () => {
  const {
    state: { user },
    token,
  } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
