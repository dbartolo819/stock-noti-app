import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/auth";
import { useSnackbar } from "notistack";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import "./Register.css";

const Register = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
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
    <div className="register">
      <form className="register__form" onSubmit={handleRegister}>
        <h1>Create An Account</h1>
        <div className="register__formInputs">
          <PersonIcon className="register__formIcon" />
          <TextField
            className="register__emailInput"
            id="inputEmail1"
            variant="outlined"
            name="email"
            size="small"
            onChange={handleOnChange}
          />
        </div>
        <div className="register__formInputs">
          <VpnKeyIcon className="register__formIcon" />
          <TextField
            className="register__passwordInput"
            id="inputPassword1"
            variant="outlined"
            name="password"
            type="password"
            size="small"
            onChange={handleOnChange}
          />
        </div>
        <div className="register__formBtns">
          <Button className="register__loginBtn" type="submit" variant="contained">
            Register
          </Button>
          <Link to="/login" className="auth__signup">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
