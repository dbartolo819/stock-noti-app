import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("here are the headers");
    console.log(axios.defaults.headers);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
