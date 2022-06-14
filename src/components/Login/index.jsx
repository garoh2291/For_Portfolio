import "./styles.css";
import React from "react";
import { Outlet } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login_section">
      <div className={"left_side"}></div>
      <Outlet></Outlet>
    </div>
  );
};
