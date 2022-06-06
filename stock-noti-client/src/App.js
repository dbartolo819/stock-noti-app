import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Stock from "./components/stock/Stock";
import Settings from "./components/sidebar/Settings";
import Layout from "./components/layouts/Layout";

import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const stockLayout = (
    <Layout title="Dashboard">
      <Stock />
    </Layout>
  );

  const settingsLayout = (
    <Layout title="Settings">
      <Settings />
    </Layout>
  );

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" element={stockLayout} />
            <Route path="dashboard" element={stockLayout} />
            <Route path="settings" element={settingsLayout} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
