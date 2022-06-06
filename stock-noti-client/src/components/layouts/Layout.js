import React from "react";

import "./Layout.css";

const Layout = (props) => {
  return (
    <div className="layout">
      <div className="layout__header">
        {props.title}
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
