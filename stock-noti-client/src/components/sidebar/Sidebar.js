import React from "react";
import { Link } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__appicon">
        <Link to="/dashboard">
          <AddchartIcon sx={{ color: "#0066cc", fontSize: 70 }} />
        </Link>
      </div>
      <Divider variant="middle" />
      <div className="sidebar__options">
        <List>
          <ListItem button key={"Dashboard"} component={Link} to="/dashboard">
            <ListItemIcon sx={{ color: "#0066cc" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "#538dd4" }} primary={"Dashboard"} />
          </ListItem>
          <ListItem button key={"Settings"} component={Link} to="/settings">
            <ListItemIcon sx={{ color: "#0066cc" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "#538dd4" }} primary={"Settings"} />
          </ListItem>
        </List>
      </div>
      <Divider variant="middle" />
      <div className="sidebar__footer">
        <a href="https://www.youtube.com/">
          <GitHubIcon sx={{ color: "#0066cc", fontSize: "27px" }} />
          <span className="sidebar__footerText">View Source</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
