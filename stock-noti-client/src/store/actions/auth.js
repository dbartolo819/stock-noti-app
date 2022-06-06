import { login } from "../reducers/auth";
import StockNotiClient from "../../utils/api";

export const loginUser = (creds) => {
  return async (dispatch) => {
    const { email, password } = creds;
    console.log(email);
    console.log(password);

    try {
      const res = await StockNotiClient.post(`${process.env.REACT_APP_API_URL}api/auth`, creds);
      dispatch(login())
      console.log("we reached here")
    }
    catch (error) {
      console.log("the error is: " + error)
    }
  };
};
