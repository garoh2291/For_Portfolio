import React from "react";
import { Input } from "reactstrap";
import "./styles.css";

export const Search = ({ handleSearch }) => {
  return (
    <div className="search_section">
      <Input
        type="search"
        placeholder="Search Task"
        name="search"
        onChange={handleSearch}
      ></Input>
    </div>
  );
};
