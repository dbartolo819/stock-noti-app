import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Stock from "./components/stock/Stock";
import Settings from "./components/sidebar/Settings";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

import "./App.css";

function App() {  
  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Stock />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
