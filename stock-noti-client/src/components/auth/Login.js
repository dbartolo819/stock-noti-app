import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/auth";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setOpen(true);
    dispatch(loginUser(formData));
    setOpen(false)
  };

  return (
    <div className="auth">
      <form className="stockform__form" onSubmit={handleLogin}>
        <label htmlFor="labelEmail1">Email:</label>
        <input
          type="text"
          id="inputEmail1"
          name="email"
          onChange={handleOnChange}
        />
        <label htmlFor="labelPassword1">Password:</label>
        <input
          type="password"
          id="inputPassword1"
          name="password"
          onChange={handleOnChange}
        />
        <input type="submit" value="Login" />

        <p className="auth__signup">
          Sign Up here (add a modal) (add a username field)
        </p>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
