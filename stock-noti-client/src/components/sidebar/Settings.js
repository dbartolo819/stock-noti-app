import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";

import Button from "@mui/material/Button";

const Settings = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
  }

  return (
    <div className="settings">
      <Button className="settings__logoutBtn" variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Settings;
