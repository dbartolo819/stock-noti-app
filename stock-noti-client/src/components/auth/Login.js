import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/reducers/auth";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    dispatch(login());
  };

  const handleLogout = (e) => {
    dispatch(logout());
  };

  return (
    <div>
      This is the login form
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Login;
