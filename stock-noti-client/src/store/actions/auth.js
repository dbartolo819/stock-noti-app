import { login, loginFail, authError } from "../reducers/auth";
import StockNotiClient from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (creds) => {
  return async (dispatch) => {
    const { email, password } = creds;
    console.log(email);
    console.log(password);

    try {
      const res = await StockNotiClient.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        creds
      );
      localStorage.setItem("jwtToken", res.data.accessToken);
      dispatch(loadUser());
      console.log("we are registered");
    } catch (error) {
      const errors = error.response.data.errors;
      console.log("register errors are");
      console.log(error);
      dispatch(authError({ clearErrors: true }));
      if (errors) {
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
        } else {
        }
      }
      dispatch(loginFail);
    }
  };
};

export const loginUser = (creds) => {
  return async (dispatch) => {
    const { email, password } = creds;
    console.log(email);
    console.log(password);

    try {
      const res = await StockNotiClient.post(
        `${process.env.REACT_APP_API_URL}/api/auth`,
        creds
      );
      localStorage.setItem("jwtToken", res.data.accessToken);
      dispatch(loadUser());

      console.log("we reached here");
    } catch (error) {
      const errors = error.response.data.errors;
      console.log("log in errors are");
      console.log(errors);
      dispatch(authError({ clearErrors: true }));
      if (errors) {
        errors.forEach((err) => {
          if (err.param === "email") {
            dispatch(authError({ errMsg: err.msg }));
          } else {
            err.msg.forEach((passwordErr) => {
              dispatch(
                authError({
                  errMsg: passwordErr.message.replace("The string", "Password"),
                })
              );
            });
          }
        });
      }
      dispatch(loginFail);
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.getItem("jwtToken")) {
      setAuthToken(localStorage.getItem("jwtToken"));
    }

    try {
      const res = await StockNotiClient.get(
        `${process.env.REACT_APP_API_URL}/api/auth`
      );
      dispatch(login());
    } catch (error) {
      console.log("the loaduser error is: ");
      console.log(error)
    }
  };
};
