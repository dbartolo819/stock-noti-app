import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/auth";

import { useSnackbar } from "notistack";

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
        <input type="submit" value="Register" />

        <p className="auth__signup">
          <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
