import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/auth";

import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import "./Login.css";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.name);
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleVariant = useCallback(
    (options, variant) => {
      enqueueSnackbar(options.errMessage, { variant });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => handleVariant({ errMessage: err }, "error"));
    }
  }, [errors, handleVariant]);

  if (isAuthenticated) return <Navigate to="/dashboard" replace={true} />;

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleLogin}>
        <h1>Stock Noti</h1>
        <div className="auth__formInputs">
          <PersonIcon className="auth__formIcon" />
          <TextField
            className="auth__emailInput"
            id="inputEmail1"
            variant="outlined"
            name="email"
            size="small"
            onChange={handleOnChange}
          />
        </div>
        <div className="auth__formInputs">
          <VpnKeyIcon className="auth__formIcon" />
          <TextField
            className="auth__passwordInput"
            id="inputPassword1"
            variant="outlined"
            name="password"
            type="password"
            size="small"
            onChange={handleOnChange}
          />
        </div>
        <div className="auth__formBtns">
          <Button className="auth__loginBtn" type="submit" variant="contained">
            Login
          </Button>
          <Link to="/register" className="auth__signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
//Improvement: could reuse login and register structure