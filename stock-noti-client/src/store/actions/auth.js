import { login, loginFail, authError } from "../reducers/auth";
import StockNotiClient from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (creds) => {
  return async (dispatch) => {
    try {
      const res = await StockNotiClient.post("/api/auth/register", creds);
      localStorage.setItem("jwtToken", res.data.accessToken);
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(authError({ clearErrors: true }));
      if (errors) {
        //if express-validator returned an error
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            if (err.param === "email") {
              dispatch(authError({ errMsg: err.msg }));
            } else {
              err.msg.forEach((passwordErr) => {
                dispatch(
                  authError({
                    errMsg: passwordErr.message.replace(
                      "The string",
                      "Password"
                    ),
                  })
                );
              });
            }
          });
        } else { //if manual error returned
          dispatch(
            authError({
              errMsg: errors.msg,
            })
          );
        }
      }
      dispatch(loginFail());
    }
  };
};

export const loginUser = (creds) => {
  return async (dispatch) => {
    try {
      const res = await StockNotiClient.post("/api/auth", creds);
      localStorage.setItem("jwtToken", res.data.accessToken);
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(authError({ clearErrors: true }));
      if (errors) {
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            if (err.param === "email") {
              dispatch(authError({ errMsg: err.msg }));
            } else if (err.param === "password") {
              err.msg.forEach((passwordErr) => {
                dispatch(
                  authError({
                    errMsg: passwordErr.message.replace(
                      "The string",
                      "Password"
                    ),
                  })
                );
              });
            }
          });
        } else {
          dispatch(
            authError({
              errMsg: errors.msg,
            })
          );
        }
      }
      dispatch(loginFail());
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.getItem("jwtToken")) {
      setAuthToken(localStorage.getItem("jwtToken"));
    }

    try {
      const res = await StockNotiClient.get("/api/auth");
      dispatch(login());
    } catch (error) {
      console.log("log in error", error);
    }
  };
};
