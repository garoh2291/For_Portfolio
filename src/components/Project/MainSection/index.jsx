import React from "react";
import { Header } from "./Header";
import { Body } from "./Body";

import "./styles.css";
export const MainSection = ({ getTasks }) => {
  return (
    <div className="main_section">
      <Header getTasks={getTasks} />
      <Body />
    </div>
  );
};
