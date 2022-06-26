import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Layout from "./Layout";

import "./ProtectedRoute.css";

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  let location = useLocation().pathname;
  let layoutTitle = location.charAt(1).toUpperCase() + location.substring(2);

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return (
    <div className="protectedRoute">
      <Sidebar />
      <Layout title={layoutTitle}>
        <Outlet />
      </Layout>
    </div>
  );
};

export default ProtectedRoute;
