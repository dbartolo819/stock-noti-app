import React from "react";
import { useSelector } from "react-redux";

import Login from "./components/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";

import "./App.css";
import Stock from "./components/stock/Stock";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Stock />
        </div>
      )}
    </div>
  );
}

export default App;
